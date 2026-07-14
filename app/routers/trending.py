from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db

from app.repositories import trending_repository

from app.schemas.trending import TrendingPostResponse

router = APIRouter(
    prefix="/trending",
    tags=["Trending"]
)


@router.get(
    "/",
    response_model=List[TrendingPostResponse]
)
def get_trending_posts(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):

    return trending_repository.get_trending_posts(
        db,
        skip,
        limit
    )