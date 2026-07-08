from sqlalchemy.orm import Session, joinedload

from app.models.post import Post

def get_posts(
    db: Session,
    skip: int,
    limit: int
):
    return (
        db.query(Post)
        .options(joinedload(Post.user))
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
        .options(joinedload(Post.user))
        .filter(Post.id == post_id)
        .first()
    )