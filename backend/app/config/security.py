

from datetime import datetime, timedelta, timezone
from typing import Any


import bcrypt
from jose import jwt
from app.config.config import settings


def hash_password(plain_password: str) -> str:
    salt = bcrypt.gensalt()

    # This create a hash password to store in
    # the database
    return bcrypt.hashpw(
        plain_password.encode("utf-8"),
        salt
    ).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain-text password against a bcrypt hash.

    bcrypt stores the salt inside the hash itself.
    During verification, bcrypt extracts the salt,
    hashes the provided password again, and compares
    the resulting hash with the stored one.
    """
    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8")
    )


def create_access_token(data: dict[str | Any], expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        """
        This create an expiration date to store in JWT.
        Extract the ACCESS_TOKEN_EXPIRE_HOURS to calculate
        the expiration date
        """
        expire = datetime.now(timezone.utc) + timedelta(hours=settings.ACCESS_TOKEN_EXPIRE_HOURS)
    # Stores the expiration to the encode var
    to_encode.update({"exp": expire})
    """
    Create the whole jwt token to store
    inside the cookie httponly browser
    """
    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )

