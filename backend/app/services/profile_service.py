
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
        self.profile_repo = profile_repo


    async def get_profile(
        self, 
        user: User
    ):
        profile = self.profile_repo.get_or_create_profile(user)
        await self.db.commit()
        await self.db.refresh(profile)
        print("return profile") 
        return {
            "email": user.email,
            "full_name": user.full_name,
            "avatar_url": profile.avatar_url,
            "about_me": profile.about_me,
            "social_media": {
                "facebook_url": profile.facebook_url,
                "instagram_url": profile.instagram_url,
                "linkedin_url": profile.linkedin
            }
        }


    async def search_profile(
        self,
        profile_name: str,
        user: User
    ):
        result = await self.profile_repo.search_profile(profile_name, user)
        if len(result) == 0:
            raise ValueError("User not found")
        outputlist = []
        for data in result:
            outputlist.append({
                "email": data.email,
                "full_name": data.full_name,
                "avatar_url": data.profile.avatar_url,
                "about_me": data.profile.about_me,
                "facebook_url": data.profile.facebook_url,
                "instagram_url": data.profile.instagram_url,
                "linkedin_url": data.profile.linkedin
            })



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






