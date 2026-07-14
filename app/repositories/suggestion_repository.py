from sqlalchemy.orm import Session

from app.models.user import User
from app.models.follow import Follow


def get_suggested_users(
    db: Session,
    current_user_id: int,
    limit: int = 10
):

    followed_users = (
        db.query(Follow.following_id)
        .filter(
            Follow.follower_id == current_user_id
        )
        .subquery()
    )

    users = (
        db.query(User)
        .filter(
            User.id != current_user_id,
            ~User.id.in_(followed_users)
        )
        .limit(limit)
        .all()
    )

    return users