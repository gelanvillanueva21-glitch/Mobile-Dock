
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
        profile = await self.profile_repo.get_or_create_profile(user)
        await self.db.commit()
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
    ):
        result = await self.profile_repo.search_profile(profile_name)
        if len(result) == 0:
            raise ValueError("User not found")
        outputlist = []
        for data in result:
            outputlist.append({
                "id": data.id,
                "email": data.email,
                "full_name": data.full_name,
                "avatar_url": data.profile.avatar_url,
                "about_me": data.profile.about_me,
                "social_media": {
                    "facebook_url": data.profile.facebook_url,
                    "instagram_url": data.profile.instagram_url,
                    "linkedin_url": data.profile.linkedin
                }
            })
        return outputlist



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
        user_id: int
    ) -> None:
        if social_media.facebook_url:
            await self.profile_repo.edit_facebook_url(social_media.facebook_url, user_id)
        if social_media.instagram_url:
            await self.profile_repo.edit_instagram_url(social_media.instagram_url, user_id)
        if social_media.linkedin_url:
            await self.profile_repo.edit_linkedin_url(social_media.linkedin_url, user_id)
        await self.db.commit()


    async def edit_avatar(
        self,
        avatar_url: str,
        user_id: int
    ) -> None:
        await self.profile_repo.edit_avatar(avatar_url, user_id)
        await self.db.commit()


    async def edit_or_change_description(
            self,
            description: str,
            user_id: int
    ) -> None:
        print("Service")
        await self.profile_repo.edit_about_me(description, user_id)
        await self.db.commit()






