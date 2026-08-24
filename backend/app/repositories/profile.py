

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated


from app.database.models.profile import Profile
from app.database.models.users import User
from app.schemas.profile import ProfileResponse
from app.services.deps import get_current_user




class ProfileRepository:
    def __init__(self,  db: AsyncSession):
        self.db = db


    async def get_profile(self, current_user: Annotated[User, Depends(get_current_user)]):
        if current_user.profile:
            return current_user.profile
        profile = Profile(user_id=current_user.id)
        self.db.add(profile)
        await self.db.commit()
        await self.db.refresh(profile)
        return profile


    async def edit_full_name(
        self, 
        full_name: str
    ) -> None:
        pass


    async def edit_avatar(self, new_avatar_url: str) -> None:
        pass


