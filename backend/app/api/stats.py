

from fastapi import APIRouter, status, HTTPException, Body
from typing import Annotated
from pydantic import Field
from app.utilities.deps import StatsDependency, UserDependency


router = APIRouter(prefix="/stats", tags=["stats"])



@router.post("/application")
async def open_application(
    application: Annotated[str, Body(...)],
    user: UserDependency,
    repo: StatsDependency
): 
    try:
        response = await repo.add_application(application, user.id)
        if not response:
            raise ValueError()
        return { "status": "success" }
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to add application"
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Something error occured. Failed to execute."
        )


@router.post("/view")
async def view_profile(
    profile_id: Annotated[int, Body(...)],
    user: UserDependency,
    repo: StatsDependency
):
    try:
        response = await repo.add_profile_viewed(profile_id, user.id)
        if not response:
            raise ValueError()
        return { "status": "success" }
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to view profile"
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Something error occured."
        )


@router.post("/")
async def get_stats(user: UserDependency, repo: StatsDependency):
    try:
        data = await repo.get_or_create_stats(user.id)
        if not data:
            raise ValueError()
        response = await repo.get_profile_viewer(user.id)
        return {
            "status": "success",
            "application": [app.application for app in data.application],
            "profile_viewed": [prof.user_profile_id for prof in data.profile_viewed],
            "profile_viewer": [prof.user_id for prof in response]
        }
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to fetch the data."
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Something error occured."
        )




