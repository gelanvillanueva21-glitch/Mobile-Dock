
from datetime import datetime
from sqlalchemy import String, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING, Optional
from app.database.database import Base


if TYPE_CHECKING:
    from app.database.models.users import User
    from app.database.models.message_img import Images


class Messages(Base):
    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(primary_key=True)
    sender_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )
    receiver_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )
    message_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    message: Mapped[Optional[str]] = mapped_column(String)

    sender: Mapped[User] = relationship(
        "User",
        foreign_keys=[sender_id],
        back_populates='sent_messaged',
        cascade="all, delete-orphan"
    )
    receiver: Mapped[User] = relationship(
        "User",
        foreign_keys=receiver_id,
        back_populates='received_messaged',
        cascade="all, delete-orphan"
    )
    image_message: Mapped[list["Images"]] = relationship(
        "Images",
        back_populates="owner",
        cascade="all, delete-orphan"
    )




