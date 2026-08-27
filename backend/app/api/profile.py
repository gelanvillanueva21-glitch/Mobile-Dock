

import logging
from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from typing import Annotated
from pydantic import Field

from app.schemas.profile import ProfileResponse, SocialMedia
from app.repositories.profile import ProfileRepository
from app.services.profile_service import ProfileService
from app.utilities.deps import get_profile_service, UserDependency
from app.database.models.profile import Profile
from app.database.models.users import User
from app.utilities.deps import ProfileRepoDependency
from app.utilities.data_url import save_avatar_file


logger = logging.getLogger(__name__)
router = APIRouter(prefix='/profile', tags=['profile'])



@router.post("/edit_name")
async def edit_name(
    full_name: Annotated[str, Field(min_length=8, max_length=255)],
    user: UserDependency,
    profile_service: Annotated[ProfileService, Depends(get_profile_service)]
):
    try:
        result = await profile_service.change_full_name(full_name, user)
        return {
            "status": "success",
            "full_name": result
        }
    except Exception:
        logger.error("Something went wrong")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to change full name"
        )


@router.post("/edit_social")
async def edit_social_media(
    social_media: SocialMedia,
    profile: ProfileRepoDependency,
    profile_service: Annotated[ProfileService, Depends(get_profile_service)]
):
    try:
        result = await profile_service.edit_social_media(social_media, profile)
        return {"status": "success",}
    except Exception:
        logger.error("Something wrong")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to change social media's"
        )



@router.post("/edit_avatar")
async def edit_avatar(
    avatar: Annotated[UploadFile, File(...)],
    profile_service: Annotated[ProfileService, Depends(get_profile_service)],
    profile: ProfileRepoDependency
):
    try:
        avatar_url = save_avatar_file(avatar)
        await profile_service.edit_avatar(avatar_url, profile)
        return { "status": "success" }
    except Exception:
        logger.error("Something wrong")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to change profile picture"
        )



@router.post("/edit_about_me")
async def edit_aboute_me(
    description: str,
    profile_service: Annotated[ProfileService, Depends(get_profile_service)],
    profile: ProfileRepoDependency
):
    try:
        await profile_service.edit_or_change_description(description, profile)
        return { "status": "success" }
    except Exception:
        logger.error("Something wrong at [Edit about me router]")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to edit about me"
        )



@router.get("", response_model=ProfileResponse)
async def get_profile(
    user: UserDependency,
    profile_service: Annotated[ProfileService, Depends(get_profile_service)]
):
    try:
        result = await profile_service.get_profile(user)
        return {
            "email": user.email,
            "full_name": user.full_name,
            "avatar_url": result.avatar_url,
            "about_me": result.about_me,
            "facebook_url": result.facebook_url,
            "instagram_url": result.instagram_url,
            "linkedin_url": result.linkedin
        }
    except Exception:
        logger.error("Something error at [get Profile]")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to fetch profile"
        )


