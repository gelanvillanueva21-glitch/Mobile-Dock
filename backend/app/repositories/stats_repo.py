

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


from app.database.models.stats import Statistics, Application, ProfileViewed, UserWhoViewed



class StatisticsRepository:
    def __init__(self, db: AsyncSession):
        self.db = db


    async def get_stats_by_id(self, id: int) -> Statistics | None:
        result = await self.db.execute(select(Statistics).where(Statistics.user_id == id))
        return result.scalar_one_or_none()


    async def get_or_create_stats(self, id: int) -> Statistics | None:
        result = await self.get_stats_by_id(id)
        if result:
            return result
        stat = Statistics(user_id = id)
        self.db.add(stat)
        await self.db.commit()
        return stat


    async def add_application(self, application: str, id: int):
        await self.get_or_create_stats(id)
        app = Application(application=application)
        self.db.add(app)
        await self.db.commit()
        return app


    async def add_profile_viewed(self, profile_id: int, user_id: int):
        await self.get_or_create_stats(user_id)
        profile_view = ProfileViewed(
            user_id=user_id,
            user_profile_id=profile_id
        )
        self.db.add(profile_view)
        await self.db.commit()
        return profile_view


    async def get_profile_viewer(self, user_id: int):
        result = await self.db.execute(select(ProfileViewed).where(ProfileViewed.user_profile_id == user_id))
        return result.scalars().all()

