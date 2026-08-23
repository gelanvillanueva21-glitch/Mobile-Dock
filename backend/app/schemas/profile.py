

from pydantic import BaseModel, Field, ConfigDict
from typing import Annotated


class ProfileResponse(BaseModel):
    email: str
    full_name: str
    avatar_url: str
    about_me: str

    model_config = ConfigDict(from_attributes=True)


