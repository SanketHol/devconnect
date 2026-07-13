from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.like import Like
from app.models.post import Post
from app.schemas.like import LikeRequest
from app.utils.auth import get_current_user
from app.repositories import notification_repository

router = APIRouter(
    prefix="/likes",
    tags=["Likes"]
)


@router.post("/")
def toggle_like(
    request: LikeRequest,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # Check if post exists
    post = (
        db.query(Post)
        .filter(Post.id == request.post_id)
        .first()
    )

    if post is None:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    # Check if user already liked this post
    existing_like = (
        db.query(Like)
        .filter(
            Like.post_id == request.post_id,
            Like.user_id == current_user.id
        )
        .first()
    )

    # Unlike
    if existing_like:
        db.delete(existing_like)
        db.commit()

        return {
            "message": "Post unliked"
        }

    # Like
    new_like = Like(
        post_id=request.post_id,
        user_id=current_user.id
    )

    db.add(new_like)
    db.commit()

    # Create notification (don't notify yourself)
    if post.user_id != current_user.id:
        notification_repository.create_notification(
            db=db,
            recipient_id=post.user_id,
            sender_id=current_user.id,
            post_id=post.id,
            notification_type="like"
        )

    return {
        "message": "Post liked"
    }