

from sqlalchemy.ext.asyncio import AsyncSession
from app.database.models.message import Messages
from app.schemas.message import MessageRequest, MessageResponse
from app.repositories.message_repo import MessageRepo


class MessageService:
    def __init__(
        self, 
        db: AsyncSession, 
        repo: MessageRepo
    ):
        self.database = db
        self.repo = repo


    async def message_request(
        self,
        data: MessageRequest
    ):
        result = await self.repo.create_message(
            data.sender_id,
            data.receiver_id
        )
        return [
            
        ]

    async def get_messages(
        self,
        data: MessageRequest,
        message_id: int
    ):
        result = await self.repo.get_messages(
            data.sender_id,
            data.receiver_id,
            message_id,
        )
        return [
            MessageResponse(
                message_id=info.message_id,
                message_at=info.message_at,
                message_content=info.message
            )
            for info in result
        ]

