
import logging
from fastapi import APIRouter, status, HTTPException, Body
from typing import Annotated
from pydantic import Field
from app.utilities.deps import StatsDependency, UserDependency, UserRepoDependency


router = APIRouter(prefix="/stats", tags=["stats"])


logger = logging.getLogger(__name__)




@router.post("/application")
async def open_application(
    application: Annotated[str, Body(...)],
    user: UserDependency,
    repo: StatsDependency
): 
    APPLICATION = {'Chess', 'Cloud Gallery', 'Messenger'}
    try:
        if application.capitalize() not in APPLICATION:
            raise AttributeError()
        print("hello world!")
        response = await repo.add_application(application, user.id)
        if not response:
            raise ValueError()
        return { "status": "success" }
    except AttributeError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found."
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to add application"
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something error occured. Failed to execute."
        )


@router.post("/view")
async def view_profile(
    profile_id: Annotated[int, Body(...)],
    user: UserDependency,
    repo: StatsDependency,
    user_repo: UserRepoDependency
):
    try:
        result = await user_repo.get_by_id(profile_id)
        if not result:
            raise ValueError()
        response = await repo.add_profile_viewed(profile_id, user.id)
        if not response:
            raise ValueError()
        return { "status": "success" }
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to view profile or profile not exist."
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something error occured."
        )


@router.get("/")
async def get_stats(user: UserDependency, repo: StatsDependency):
    try:
        data = await repo.get_or_create_stats(user.id)
        if not data:
            raise ValueError()
        profile_view = await repo.get_profile_viewed(user.id)
        application = await repo.get_application(user.id)
        profile_viewed = await repo.get_profile_viewer(user.id)
        return {    
            "status": "success",
            "application": [app.application for app in application],
            "profile_viewed": [prof.user_profile_id for prof in profile_viewed],
            "profile_viewer": [prof.user_id for prof in profile_view]
        }
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to fetch the data."
        )
    except Exception:
        logger.exception("Stats error.")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something error occured."
        )




