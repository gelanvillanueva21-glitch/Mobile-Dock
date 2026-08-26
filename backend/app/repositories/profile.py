

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.models.profile import Profile
from app.database.models.users import User
from app.services.deps import get_current_user




class ProfileRepository:
    def __init__(self,  db: AsyncSession):
        self.db = db


    async def get_or_create_profile(self, user: User) -> Profile:
        if user.profile:
            return user.profile
        profile = Profile(user_id=user.id)
        self.db.add(profile)
        await self.db.commit()
        await self.db.refresh(profile)
        return profile


    async def edit_full_name(
        self, 
        full_name: str,
        user: User
    ) -> None:
        user.full_name = full_name


    async def edit_avatar(self, new_avatar_url: str) -> None:
        result = await self.get_profile()
        result.avatar_url = new_avatar_url


    async def edit_social_media_url(
        self,
        facebook_url: str | None = None,
        instagram_url: str | None = None,
        linkedin_url: str | None = None
    ) -> None:
        result = await self.get_profile()
        if facebook_url:
            result.facebook_url = facebook_url
        if instagram_url:
            result.instagram_url = instagram_url
        if linkedin_url:
            result.linkedin = linkedin_url



