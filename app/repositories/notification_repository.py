from sqlalchemy.orm import Session, joinedload

from app.models.notification import Notification


def create_notification(
    db: Session,
    recipient_id: int,
    sender_id: int,
    notification_type: str,
    post_id: int | None = None
):

    notification = Notification(
        recipient_id=recipient_id,
        sender_id=sender_id,
        post_id=post_id,
        type=notification_type
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification


def get_notifications(
    db: Session,
    user_id: int
):

    return (
        db.query(Notification)
        .options(
            joinedload(Notification.sender)
        )
        .filter(
            Notification.recipient_id == user_id
        )
        .order_by(
            Notification.created_at.desc()
        )
        .all()
    )


def get_unread_count(
    db: Session,
    user_id: int
):

    return (
        db.query(Notification)
        .filter(
            Notification.recipient_id == user_id,
            Notification.is_read == False
        )
        .count()
    )


def mark_as_read(
    db: Session,
    notification_id: int,
    user_id: int
):

    notification = (
        db.query(Notification)
        .options(
            joinedload(Notification.sender)
        )
        .filter(
            Notification.id == notification_id,
            Notification.recipient_id == user_id
        )
        .first()
    )

    if notification is None:
        return None

    notification.is_read = True

    db.commit()
    db.refresh(notification)

    return notification


def delete_notification(
    db: Session,
    notification_id: int,
    user_id: int
):

    notification = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id,
            Notification.recipient_id == user_id
        )
        .first()
    )

    if notification is None:
        return False

    db.delete(notification)
    db.commit()

    return True