
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.database.database import engine


from app.api.auth import router as auth_router
from app.api.profile import router as profile_router



@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.execute(text("SELECT 1"))
    print("Database Connection Established")
    yield
    await engine.dispose()
    print("Database Connection Closed")



app = FastAPI(title="Mobile-Dock", lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(auth_router)
app.include_router(profile_router)


@app.get("/test")
def test_api():
    return {
        "status": "success",
        "health": "Api success"
    }


