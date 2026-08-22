

from fastapi import APIRouter, Depends, Response, HTTPException, status
from typing import Annotated

from app.repositories.user import UserRepository
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.services.deps import get_user_repo, get_current_user, DatabaseDependency
from app.config.security import verify_password, create_access_token
from app.database.models.users import User



router = APIRouter(prefix="/auth", tags=["auth"])


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
async def register(
    data: UserCreate,
    repo: Annotated[UserRepository, Depends(get_user_repo)]
):
    existing = await repo.get_by_email(data.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    return await repo.create(data)



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



@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logout successful"}


