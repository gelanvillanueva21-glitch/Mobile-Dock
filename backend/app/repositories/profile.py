

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.models.profile import Profile
from app.database.models.users import User





class ProfileRepository:
    def __init__(self,  db: AsyncSession):
        self.db = db


    def get_or_create_profile(self, user: User) -> Profile:
        if user.profile:
            return user.profile
        profile = Profile(user_id=user.id)
        self.db.add(profile)
        return profile


    async def search_profile(
        self,
        profile_name: str,
        user: User
    ) -> list[User]:
        result = await self.db.execute(select(User).where(User.full_name == profile_name))
        return result.scalars().all()


    def edit_full_name(
        self, 
        full_name: str,
        user: User
    ) -> None:
        user.full_name = full_name


    def edit_avatar(
        self, 
        new_avatar_url: str,
        profile: Profile
    ) -> None:
        profile.avatar_url = new_avatar_url


    def edit_facebook_url(
        self, 
        facebook_url: str,
        profile: Profile
        ) -> None:
        profile.facebook_url = facebook_url


    def edit_instagram_url(
        self,
        instagram_url: str,
        profile: Profile
    ) -> None:
        profile.instagram_url = instagram_url


    def edit_linkedin_url(
        self,
        linkedin_url: str,
        profile: Profile
    ) -> None:
        profile.linkedin = linkedin_url


    def edit_about_me(
        self,
        description: str,
        profile: Profile
    ) -> None:
        profile.about_me = description



