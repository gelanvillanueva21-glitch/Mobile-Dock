
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.database.database import engine


from app.api.auth import router as auth_router



@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.execute(text("SELECT 1"))
    print("Database Connection Established")
    yield
    await engine.dispose()
    print("Database Connection Closed")



app = FastAPI(title="Mobile-Dock", lifespan=lifespan)


app.include_router(auth_router)


@app.get("/test")
def test_api():
    return {
        "status": "success",
        "health": "Api success"
    }


