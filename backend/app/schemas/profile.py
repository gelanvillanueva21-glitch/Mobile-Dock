

from fastapi import File, UploadFile
from pydantic import BaseModel, Field, ConfigDict
from typing import Annotated


class SocialMedia(BaseModel):
    facebook_url: str | None = None
    instagram_url: str | None = None
    linkedin_url: str | None = None



class EditProfile(BaseModel):
    full_name: str | None = None
    avatar_url: Annotated[None | UploadFile, File(...)] = None
    about_me: str | None = None
    social_media: SocialMedia



class ProfileResponse(EditProfile):
    model_config = ConfigDict(from_attributes=True)
