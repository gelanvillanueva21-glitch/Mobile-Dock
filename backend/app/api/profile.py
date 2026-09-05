

import logging
from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from fastapi.staticfiles import StaticFiles
from typing import Annotated
from pydantic import Field

from app.schemas.profile import EditProfile
from app.services.profile_service import ProfileService
from app.utilities.deps import get_profile_service, UserDependency
from app.utilities.data_url import save_avatar_file


logger = logging.getLogger(__name__)
router = APIRouter(prefix='/profile', tags=['profile'])


@router.post("/change_profile") 
async def edit_profile(
    data: EditProfile,
    user: UserDependency,
    service: Annotated[ProfileService, Depends(get_profile_service)]
):
    try:
        await service.change_full_name(data.full_name, user)
        await service.edit_social_media(data.social_media, user.id)
        avatar_url = save_avatar_file(data.avatar_url)
        await service.edit_avatar(avatar_url, user.id)
        await service.edit_or_change_description(data.about_me, user.id)
        return { "status": "success" }
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to change profile."
        )
    except Exception:
        logger.error("Something error occured.")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something error occured."
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
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch profile"
        )


@router.get("/{profile_name}")
async def search_profile(
    profile_name: str,
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
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch user"
        )



router.mount("/avatars", StaticFiles(directory="/app/app/data"), name="avatars")

