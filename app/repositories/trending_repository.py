from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.post import Post
from app.models.user import User
from app.models.like import Like
from app.models.comment import Comment


def get_trending_posts(
    db: Session,
    skip: int = 0,
    limit: int = 10
):

    likes_count = func.count(func.distinct(Like.id))
    comments_count = func.count(func.distinct(Comment.id))

    score = (
        likes_count * 2 +
        comments_count * 3
    ).label("score")

    posts = (
        db.query(
            Post.id.label("post_id"),
            Post.caption,
            Post.image_url,
            Post.user_id,
            User.full_name.label("owner_name"),
            likes_count.label("likes"),
            comments_count.label("comments"),
            score,
            Post.created_at
        )
        .join(User, User.id == Post.user_id)
        .outerjoin(Like, Like.post_id == Post.id)
        .outerjoin(Comment, Comment.post_id == Post.id)
        .group_by(
            Post.id,
            User.full_name,
            Post.caption,
            Post.image_url,
            Post.user_id,
            Post.created_at
        )
        .order_by(score.desc(), Post.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return posts