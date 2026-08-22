

import asyncio
from app.database.database import engine, Base
from app.database.models.users import User


async def create_db_table():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)



if  __name__ == "__main__":
    asyncio.run(create_db_table)
    print("Table Created!!")


