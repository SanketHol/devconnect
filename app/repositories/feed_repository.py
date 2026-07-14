from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.post import Post
from app.models.follow import Follow
from app.models.like import Like
from app.models.comment import Comment
from app.models.user import User


def get_feed(
    db: Session,
    current_user_id: int,
    skip: int = 0,
    limit: int = 10
):
    # Users followed by current user
    following_ids = (
        db.query(Follow.following_id)
        .filter(Follow.follower_id == current_user_id)
        .subquery()
    )

    posts = (
        db.query(
            Post.id,
            Post.caption,
            Post.image_url,
            Post.user_id,
            User.full_name.label("owner_name"),
            func.count(func.distinct(Like.id)).label("likes_count"),
            func.count(func.distinct(Comment.id)).label("comments_count"),
            Post.created_at,
        )
        .join(User, User.id == Post.user_id)
        .outerjoin(Like, Like.post_id == Post.id)
        .outerjoin(Comment, Comment.post_id == Post.id)
        .filter(
            (Post.user_id.in_(following_ids))
            | (Post.user_id == current_user_id)
        )
        .group_by(
            Post.id,
            Post.caption,
            Post.image_url,
            Post.user_id,
            User.full_name,
            Post.created_at,
        )
        .order_by(Post.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return posts