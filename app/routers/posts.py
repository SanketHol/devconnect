from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.post import Post
from app.schemas.post import PostCreate, PostResponse
from app.utils.auth import get_current_user

router = APIRouter(
    prefix="/posts",
    tags=["Posts"]
)



@router.post("/")
def create_post(
    post: PostCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    new_post = Post(
        caption=post.caption,
        image_url=post.image_url,
        user_id=current_user.id
    )

    db.add(new_post)

    db.commit()

    db.refresh(new_post)

    return {
        "message": "Post created successfully",
        "post_id": new_post.id
    }


@router.get(
    "/",
    response_model=List[PostResponse]
)
def get_posts(
    db: Session = Depends(get_db)
):

    posts = (
        db.query(Post)
        .order_by(Post.created_at.desc())
        .limit(10)
        .all()
    )

    return posts

from fastapi import HTTPException

@router.get(
    "/{post_id}",
    response_model=PostResponse
)
def get_post(
    post_id: int,
    db: Session = Depends(get_db)
):

    post = (
        db.query(Post)
        .filter(Post.id == post_id)
        .first()
    )

    if post is None:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    return post


@router.delete("/{post_id}")
def delete_post(
    post_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    post = (
        db.query(Post)
        .filter(Post.id == post_id)
        .first()
    )

    if post is None:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    if post.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="You are not allowed to delete this post"
        )

    db.delete(post)

    db.commit()

    return {
        "message": "Post deleted successfully"
    }


@router.put(
    "/{post_id}",
    response_model=PostResponse
)
def update_post(
    post_id: int,
    updated_post: PostCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    post = (
        db.query(Post)
        .filter(Post.id == post_id)
        .first()
    )

    if post is None:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    if post.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="You are not allowed to update this post"
        )

    post.caption = updated_post.caption
    post.image_url = updated_post.image_url

    db.commit()
    db.refresh(post)

    return post