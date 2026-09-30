

from sqlalchemy import select, or_
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession


from app.database.models.message import Messages

class MessageRepo:
    def __init__(self, db: AsyncSession):
        self.database = db


    async def get_messages(
        self, 
        sender_id: int,
        receiver_id: int,
        message_id: int | None = None
    ) -> list[Messages]:
        data = (
            select(Messages)
            .options(
                selectinload(
                    Messages.image_message
                )
            )
            .where(
                or_(
                    (Messages.sender_id == sender_id) & (Messages.receiver_id == receiver_id),
                    (Messages.receiver_id == sender_id) & (Messages.sender_id == receiver_id)
                )
            )
        )
        
        if message_id:
            data = data.where(
                Messages.id < message_id
            )
        data = data.order_by(Messages.id.desc()).limit(50)

        result = await self.database.execute(data)
        return list(reversed(result.scalars().all()))


    async def create_message(
        self,
        sender_id: int,
        receiver_id: int
    ) -> Messages:
        data = Messages(
            sender_id=sender_id,
            receiver_id=receiver_id
        )
        self.database.add(data)
        await self.database.commit()
        await self.database.refresh(data)
        return data



