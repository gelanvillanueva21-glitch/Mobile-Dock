

from fastapi import Depends, HTTPException, status, Request
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.database import get_database

from app.repositories.profile import ProfileRepository
from app.repositories.user import UserRepository
from app.repositories.stats_repo import StatisticsRepository

from typing import Annotated
from app.config.config import settings
from app.database.models.users import User

from app.services.profile_service import ProfileService
from app.services.user_service import UserService

# This avoid us writing Annotated[AsyncSession, Depends(...)] every
# function at that needs database
DatabaseDependency = Annotated[AsyncSession, Depends(get_database)]


def get_profile_repo(db: DatabaseDependency) -> ProfileRepository:
    return ProfileRepository(db)


def get_profile_service(
        db: DatabaseDependency, 
        profile: Annotated[ProfileRepository, Depends(get_profile_repo)]
) -> ProfileService:
    return ProfileService(db, profile)


def get_user_repo(db: DatabaseDependency) -> UserRepository:
    return UserRepository(db)


def get_user_service(
        db: DatabaseDependency,
        user_repo: Annotated[UserRepository, Depends(get_user_repo)]
    ) -> UserService:
    return UserService(db, user_repo)


def get_stat_repo(db: DatabaseDependency) -> StatisticsRepository:
    return StatisticsRepository(db)


async def get_current_user(
    reqeust: Request,
    db: DatabaseDependency
) -> User:
    """
    This function check wether the cookie is still
    exist in the user browser and let us return
    an info of a user
    """
    token = reqeust.cookies.get("access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        user_id: str | None = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    user_repo = UserRepository(db)
    user = await user_repo.get_by_id(int(user_id))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user


# A variable dependency to reuse it and not needing writing
# Annotated everytime it needs this
ProfileRepoDependency = Annotated[
    ProfileRepository, 
    Depends(get_profile_repo)
]
UserRepoDependency = Annotated[
    UserRepository, 
    Depends(get_user_repo)
]
UserDependency = Annotated[
    User, 
    Depends(get_current_user)
]
StatsDependency = Annotated[
    StatisticsRepository,
    Depends(get_stat_repo)
]


