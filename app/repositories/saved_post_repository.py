from sqlalchemy.orm import Session

from app.models.saved_post import SavedPost
from app.models.post import Post
from app.models.user import User


def get_saved_post(
    db: Session,
    user_id: int,
    post_id: int
):
    return (
        db.query(SavedPost)
        .filter(
            SavedPost.user_id == user_id,
            SavedPost.post_id == post_id
        )
        .first()
    )


def save_post(
    db: Session,
    user_id: int,
    post_id: int
):
    saved = SavedPost(
        user_id=user_id,
        post_id=post_id
    )

    db.add(saved)
    db.commit()
    db.refresh(saved)

    return saved


def unsave_post(
    db: Session,
    saved_post: SavedPost
):
    db.delete(saved_post)
    db.commit()


def get_all_saved_posts(
    db: Session,
    user_id: int
):
    return (
        db.query(
            SavedPost.id,
            Post.id.label("post_id"),
            Post.caption,
            Post.image_url,
            User.full_name.label("owner_name"),
            SavedPost.created_at
        )
        .join(Post, SavedPost.post_id == Post.id)
        .join(User, User.id == Post.user_id)
        .filter(
            SavedPost.user_id == user_id
        )
        .order_by(SavedPost.created_at.desc())
        .all()
    )