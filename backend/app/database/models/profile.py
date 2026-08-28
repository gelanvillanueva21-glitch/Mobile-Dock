

from datetime import datetime
from sqlalchemy import String, DateTime, func, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.database import Base
from app.database.models.users import User


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        unique=True
        )
    avatar_url: Mapped[str | None] = mapped_column(
        String(555),
        default=None,
        nullable=True
    )
    about_me: Mapped[str | None] = mapped_column(
        String(555),
        default=None,
        nullable=True
    )
    facebook_url: Mapped[str | None] = mapped_column(
        String(555),
        default=None,
        nullable=True
    )
    instagram_url: Mapped[str | None] = mapped_column(
        String(555),
        default=None,
        nullable=True
    )
    linkedin: Mapped[str | None] = mapped_column(
        String(555),
        default=None,
        nullable=True
    )



    user: Mapped["User"] = relationship(
        "User",
        back_populates="profile"
    )


