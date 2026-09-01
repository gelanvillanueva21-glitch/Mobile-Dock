

from fastapi import APIRouter, Depends, Response, HTTPException, status, Query
from typing import Annotated

from app.repositories.user import UserRepository
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.utilities.deps import get_user_repo, get_user_service, UserDependency
from app.config.security import verify_password, create_access_token
from app.database.models.users import User

from app.services.user_service import UserService



router = APIRouter(prefix="/auth", tags=["auth"])


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
async def register(
    data: UserCreate,
    service: Annotated[UserService, Depends(get_user_service)]
):
    try:
        result = await service.create_account(data)
        return result
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account email already exist"
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Failed to create account"
        )




@router.post("/login")
async def login(
    response: Response,
    data: UserLogin,
    repo: Annotated[UserRepository, Depends(get_user_repo)]):
        user = await repo.get_by_email(data.email)
        if not user or not verify_password(data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )

        """
        This get the token created
        then stores it inside the cookie
        so when getting the user's info
        at the get_current_user it check the
        access_token.
        """
        access_token = create_access_token(data={"sub": str(user.id)})
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            max_age=43200,
            samesite="lax",
            secure=False
        )
        return {"message": "Login successfully"}


@router.post("/change_password")
async def change_password(
    new_password: Annotated[str, Query(min_length=8, max_length=255)],
    user: UserDependency,
    user_service: Annotated[UserService, Depends(get_user_service)]
):
    try:
        await user_service.change_password(new_password, user.id)
        return { "status": "success" }
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must not be the same to previous password."
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Failed to change password."
        )



@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logout successful"}



@router.get("/me", response_model=UserResponse)
async def get_current_me(current_user: UserDependency):
    return current_user




