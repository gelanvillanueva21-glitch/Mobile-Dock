

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
    profile_service: Annotated[ProfileService, Depends(get_profile_service)],
    user: UserDependency
):
    try:
        await profile_service.edit_social_media(social_media, user.id)
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
    user: UserDependency
):
    try:
        avatar_url = save_avatar_file(avatar)
        await profile_service.edit_avatar(avatar_url, user.id)
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
    profile: ProfileRepoDependency,
    user: UserDependency
):
    try:
        print("Router")
        await profile_service.edit_or_change_description(description, user.id)
        return { "status": "success" }
    except Exception:
        logger.error("Something wrong at [Edit about me router]")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to edit about me"
        )



@router.get("")
async def get_profile(
    user: UserDependency,
    profile_service: Annotated[ProfileService, Depends(get_profile_service)]
):
    try:
        print("Profile")
        result = await profile_service.get_profile(user)
        return result
    except Exception as e:
        logger.exception(f"Error at [get Profile]: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to fetch profile"
        )


@router.get("/{profile_name}")
async def search_profile(
    profile_name: str,
    user: UserDependency,
    profile_service: Annotated[ProfileService, Depends(get_profile_service)]
):
    try:
        result = await profile_service.search_profile(profile_name)
        return result
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    except Exception as e:
        logger.exception(f"Error at [get Profile]: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to fetch user"
        )


