from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.comment import Comment
from app.models.post import Post
from app.schemas.comment import CommentCreate
from app.utils.auth import get_current_user

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

    return {
        "message": "Comment added successfully",
        "comment_id": new_comment.id
    }

