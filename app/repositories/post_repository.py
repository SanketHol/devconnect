from sqlalchemy.orm import Session, joinedload
from app.models.comment import Comment
from app.models.post import Post

def get_posts(
    db: Session,
    skip: int,
    limit: int
):
    return (
        db.query(Post)
        .options(

            joinedload(Post.user),

            joinedload(Post.comments)
                .joinedload(Comment.user)

        )
        .order_by(Post.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

def get_post(
    db: Session,
    post_id: int
):

    return (
        db.query(Post)
        .options(

            joinedload(Post.user),

            joinedload(Post.comments)
                .joinedload(Comment.user)

        )
        .filter(Post.id == post_id)
        .first()
    )

from app.models.follow import Follow


def get_feed_posts(
    db: Session,
    current_user_id: int,
    skip: int = 0,
    limit: int = 10
):
    return (
        db.query(Post)
        .join(
            Follow,
            Post.user_id == Follow.following_id
        )
        .filter(
            Follow.follower_id == current_user_id
        )
        .order_by(Post.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )