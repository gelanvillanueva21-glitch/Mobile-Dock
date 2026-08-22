

from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Annotated


class UserBase(BaseModel):
    email: EmailStr
    full_name: Annotated[str, Field(
        min_length=5, 
        max_length=255,
        default=None)]


class UserCreate(UserBase):
    password: Annotated[str, Field(
        min_length=8,
        max_length=255
    )]


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"





