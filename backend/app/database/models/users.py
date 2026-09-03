

from datetime import datetime
from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING
from app.database.database import Base

if TYPE_CHECKING:
    from app.database.models.profile import Profile
    from app.database.models.stats import Statistics


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False
    )
    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )
    full_name: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )


    profile: Mapped["Profile"] = relationship(
        "Profile",
        back_populates="user"
    )
    stats: Mapped["Statistics"] = relationship(
        "Statistics",
        back_populates="stats_owner"
    )



