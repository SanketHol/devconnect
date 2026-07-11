from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.user import User


def create_user(
    db: Session,
    user: User
):
    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def get_user_by_email(
    db: Session,
    email: str
):
    return (
        db.query(User)
        .filter(User.email == email)
        .first()
    )


def get_user_by_id(
    db: Session,
    user_id: int
):
    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )


def update_user(
    db: Session,
    user: User
):
    db.commit()
    db.refresh(user)

    return user


def search_users(
    db: Session,
    query: str
):
    return (
        db.query(User)
        .filter(
            or_(
                User.full_name.ilike(f"%{query}%"),
                User.email.ilike(f"%{query}%")
            )
        )
        .all()
    )