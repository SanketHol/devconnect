from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.utils.auth import get_current_user

from app.models.post import Post

from app.repositories import saved_post_repository

from app.schemas.saved_post import (
    SavePostRequest,
    SavedPostResponse
)

router = APIRouter(
    prefix="/saved-posts",
    tags=["Saved Posts"]
)


@router.post("/")
def toggle_save_post(
    request: SavePostRequest,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    post = (
        db.query(Post)
        .filter(Post.id == request.post_id)
        .first()
    )

    if post is None:
        raise HTTPException(
            status_code=404,
            detail="Post not found."
        )

    saved = saved_post_repository.get_saved_post(
        db,
        current_user.id,
        request.post_id
    )

    if saved:
        saved_post_repository.unsave_post(
            db,
            saved
        )

        return {
            "message": "Post removed from saved."
        }

    saved_post_repository.save_post(
        db,
        current_user.id,
        request.post_id
    )

    return {
        "message": "Post saved successfully."
    }


@router.get(
    "/",
    response_model=List[SavedPostResponse]
)
def get_saved_posts(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return saved_post_repository.get_all_saved_posts(
        db,
        current_user.id
    )