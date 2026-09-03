

from datetime import datetime
from sqlalchemy import String, DateTime, func, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING
from app.database.database import Base

if TYPE_CHECKING:
    from app.database.models.users import User

class Statistics(Base):
    __tablename__ = "stats"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
        unique=True
    )

    stats_owner: Mapped["User"] = relationship(
        "User",
        back_populates="stat"
    )
    application: Mapped[list["Application"]] = relationship(
        "Application",
        back_populates="owner_application"
    )
    profile_viewed: Mapped[list["ProfileViewed"]] = relationship(
        "ProfileViewed",
        back_populates="owner"
    )


class Application(Base):
    __tablename__ = "application_history"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("stats.user_id"),
        nullable=False
    )
    application: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    owner_application: Mapped["Statistics"] = relationship(
        "Statistics",
        back_populates="profile"
    )


class ProfileViewed(Base):
    __tablename__ = "profile_viewed"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("stats.user_id"),
        nullable=False
    )
    user_profile_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    owner: Mapped["Statistics"] = relationship(
        "Statistics",
        back_populates="profile_viewed"
    )
    viewed_user: Mapped["User"] = relationship(
        "User",
        foreign_keys=[user_profile_id]
    )




