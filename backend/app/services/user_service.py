


from sqlalchemy.ext.asyncio import AsyncSession

from app.database.models.users import User
from app.schemas.user import UserLogin, UserCreate
from app.repositories.user import UserRepository
from app.config.security import verify_password, hash_password



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
            raise ValueError()
        result = self.user_repo.create(data)
        await self.db.commit()
        await self.db.refresh(result)
        return result


    async def change_password(self, password: str, user_id: int):
        result = await self.user_repo.get_by_id(user_id)
        if verify_password(password, result.hashed_password):
            raise ValueError()
        else:
            await self.user_repo.change_password(
                hash_password(password), 
                user_id
            )
            await self.db.commit()
        return



