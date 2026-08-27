

import logging
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from pydantic import Field

from app.schemas.profile import ProfileResponse, SocialMedia
from app.repositories.profile import ProfileRepository
from app.services.profile_service import ProfileService
from app.utilities.deps import get_profile_service, UserDependency
from app.database.models.profile import Profile
from app.database.models.users import User
from app.utilities.deps import ProfileRepoDependency


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



