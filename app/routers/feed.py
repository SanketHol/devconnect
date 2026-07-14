from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.utils.auth import get_current_user
from app.repositories import feed_repository
from app.schemas.feed import FeedPostResponse


router = APIRouter(
    prefix="/feed",
    tags=["Feed"]
)


@router.get(
    "/",
    response_model=List[FeedPostResponse]
)
def get_feed(
    skip: int = 0,
    limit: int = 10,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return feed_repository.get_feed(
        db=db,
        current_user_id=current_user.id,
        skip=skip,
        limit=limit
    )