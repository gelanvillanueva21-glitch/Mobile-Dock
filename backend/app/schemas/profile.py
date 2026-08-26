

from pydantic import BaseModel, Field, ConfigDict
from typing import Annotated


class ProfileResponse(BaseModel):
    email: str
    full_name: str | None = None
    avatar_url: str | None = None
    about_me: str | None = None
    facebook_url: str | None = None
    instagram_url: str | None = None
    linkedin_url: str | None = None

    model_config = ConfigDict(from_attributes=True)


class SocialMedia(BaseModel):
    facebook_url: str | None = None
    instagram_url: str | None = None
    linkedin_url: str | None = None



