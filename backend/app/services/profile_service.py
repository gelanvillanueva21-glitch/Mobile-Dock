
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.models.users import User
from app.database.models.profile import Profile
from app.schemas.profile import SocialMedia
from app.repositories.profile import ProfileRepository


class ProfileService:
    def __init__(
            self, 
            db: AsyncSession,
            profile_repo: ProfileRepository
        ):
        self.db = db


    async def get_profile(
        self, 
        user: User
    ) -> Profile:
        result = self.profile_repo.get_or_create_profile(user)
        await self.db.commit()
        await self.db.refresh(result)
        return result


    async def change_full_name(
        self,
        full_name: str,
        user: User
    ):
        self.profile_repo.edit_full_name(full_name, user)
        await self.db.commit()
        await self.db.refresh(user)
        return user.full_name


    async def edit_social_media(
        self,
        social_media: SocialMedia,
        profile: Profile
    ) -> None:
        if social_media.facebook_url:
            self.profile_repo.edit_facebook_url(
                social_media,
                profile
            )
        if social_media.instagram_url:
            self.profile_repo.edit_instagram_url(
                social_media.instagram_url,
                profile
            )
        if social_media.linkedin_url:
            self.profile_repo.edit_linkedin_url(
                social_media.linkedin_url,
                profile
            )
        await self.db.commit()


    async def edit_avatar(
        self,
        avatar_url: str,
        profile: Profile
    ) -> None:
        self.profile_repo.edit_avatar(avatar_url, profile)
        await self.db.commit()


    async def edit_or_change_description(
            self,
            description: str,
            profile: Profile
    ) -> None:
        self.profile_repo.edit_about_me(description, profile)
        await self.db.commit()






