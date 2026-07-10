from sqlalchemy.orm import Session

from app.models.user import User
from app.models.follow import Follow


def get_user(
    db: Session,
    user_id: int
):
    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )


def get_follow(
    db: Session,
    follower_id: int,
    following_id: int
):
    return (
        db.query(Follow)
        .filter(
            Follow.follower_id == follower_id,
            Follow.following_id == following_id
        )
        .first()
    )


def create_follow(
    db: Session,
    follower_id: int,
    following_id: int
):
    follow = Follow(
        follower_id=follower_id,
        following_id=following_id
    )

    db.add(follow)
    db.commit()
    db.refresh(follow)

    return follow


def delete_follow(
    db: Session,
    follow: Follow
):
    db.delete(follow)
    db.commit()


def get_followers_count(
    db: Session,
    user_id: int
):
    return (
        db.query(Follow)
        .filter(Follow.following_id == user_id)
        .count()
    )


def get_following_count(
    db: Session,
    user_id: int
):
    return (
        db.query(Follow)
        .filter(Follow.follower_id == user_id)
        .count()
    )


def get_followers(
    db: Session,
    user_id: int
):
    return (
        db.query(User)
        .join(
            Follow,
            User.id == Follow.follower_id
        )
        .filter(
            Follow.following_id == user_id
        )
        .all()
    )


def get_following(
    db: Session,
    user_id: int
):
    return (
        db.query(User)
        .join(
            Follow,
            User.id == Follow.following_id
        )
        .filter(
            Follow.follower_id == user_id
        )
        .all()
    )