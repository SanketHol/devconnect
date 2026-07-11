from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.post import Post
from app.schemas.post import PostCreate, PostResponse
from app.utils.auth import get_current_user
from sqlalchemy.orm import joinedload
from app.repositories import post_repository
from fastapi import Query
from app.schemas.post_search import PostSearchResponse

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
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):

    posts = post_repository.get_posts(db, skip, limit)

    return posts


@router.get(
    "/feed",
    response_model=List[PostResponse]
)
def get_feed(
    skip: int = 0,
    limit: int = 10,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return post_repository.get_feed_posts(
        db,
        current_user.id,
        skip,
        limit
    )


@router.get(
    "/search",
    response_model=list[PostSearchResponse]
)
def search_posts(
    query: str,
    db: Session = Depends(get_db)
):

    return post_repository.search_posts(
        db,
        query
    )



from fastapi import HTTPException

@router.get(
    "/{post_id}",
    response_model=PostResponse
)
def get_post(
    post_id: int,
    db: Session = Depends(get_db)
):

    post = post_repository.get_post(db, post_id)

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