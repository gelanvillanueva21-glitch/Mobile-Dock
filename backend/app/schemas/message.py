

from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


class MessageRequest(BaseModel):
    sender_id: int
    receiver_id: int


class MessageResponse(BaseModel):
    message_id: int
    message_at: datetime
    message_content: str | None = None
    message_img_url: str | None = None

