

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.models.profile import Profile
from app.database.models.users import User





class ProfileRepository:
    def __init__(self,  db: AsyncSession):
        self.db = db


    async def check_by_id_profile(self, user_id: int) -> Profile | None:
        data = await self.db.execute(select(Profile).where(Profile.user_id == user_id))
        return data.scalar_one_or_none()


    async def get_or_create_profile(self, user: User) -> Profile:
        profile = await self.check_by_id_profile(user.id)
        print(profile)
        if not profile:
            profile = Profile(user_id=user.id)
            self.db.add(profile)
        return profile



    async def search_profile(
        self,
        profile_name: str
    ) -> list[User]:
        result = await self.db.execute(select(User).where(User.full_name == profile_name))
        return result.scalars().all()


    def edit_full_name(
        self, 
        full_name: str,
        user: User
    ) -> None:
        user.full_name = full_name


    async def edit_avatar(
        self, 
        new_avatar_url: str | None,
        user_id: int
    ) -> None:
        data = await self.check_by_id_profile(user_id)
        data.avatar_url = new_avatar_url


    async def edit_facebook_url(
        self, 
        facebook_url: str,
        user_id: int
    ) -> None:
        data = await self.check_by_id_profile(user_id)
        data.facebook_url = facebook_url



    async def edit_instagram_url(
        self,
        instagram_url: str,
        user_id: int
    ) -> None:
        data = await self.check_by_id_profile(user_id)
        data.instagram_url = instagram_url



    async def edit_linkedin_url(
        self,
        linkedin: str,
        user_id: int
    ) -> None:
        data = await self.check_by_id_profile(user_id)
        data.linkedin = linkedin


    async def edit_about_me(
        self,
        description: str,
        user_id: int
    ) -> None:
        data = await self.check_by_id_profile(user_id)
        data.about_me = description



