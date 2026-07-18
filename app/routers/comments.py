from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.comment import Comment
from app.models.post import Post
from app.schemas.comment import CommentCreate
from app.utils.auth import get_current_user
from app.repositories import notification_repository
from typing import List
from app.schemas.comment import CommentResponse

router = APIRouter(
    prefix="/comments",
    tags=["Comments"]
)

@router.post("/")
def create_comment(
    comment: CommentCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    post = (
        db.query(Post)
        .filter(Post.id == comment.post_id)
        .first()
    )

    if post is None:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    new_comment = Comment(
        text=comment.text,
        post_id=comment.post_id,
        user_id=current_user.id
    )

    db.add(new_comment)

    db.commit()

    db.refresh(new_comment)

    if post.user_id != current_user.id:
        notification_repository.create_notification(
            db=db,
            recipient_id=post.user_id,
            sender_id=current_user.id,
            post_id=post.id,
            notification_type="comment"
        )

    return {
        "message": "Comment added successfully",
        "comment_id": new_comment.id
    }

@router.get(
    "/{post_id}",
    response_model=List[CommentResponse]
)
def get_comments(
    post_id: int,
    db: Session = Depends(get_db)
):

    comments = (
        db.query(Comment)
        .filter(Comment.post_id == post_id)
        .order_by(Comment.created_at.asc())
        .all()
    )

    return comments

