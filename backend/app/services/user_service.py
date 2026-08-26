


from sqlalchemy.ext.asyncio import AsyncSession

from app.database.models.users import User
from app.schemas.user import UserLogin, UserCreate
from app.repositories.user import UserRepository



class UserService:
    def __init__(
        self, 
        db: AsyncSession, 
        user_repo: UserRepository
    ):
        self.db = db
        self.user_repo = user_repo


    async def create_account(
        self,
        data: UserCreate,
    ) -> User:
        existing = await self.user_repo.get_by_email(data.email)
        if existing:
            raise ValueError
        result = self.user_repo.create(data)
        await self.db.commit()
        await self.db.refresh(result)
        return result



