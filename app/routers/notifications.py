from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.notification import NotificationResponse
from app.repositories import notification_repository
from app.utils.auth import get_current_user

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.get(
    "/",
    response_model=List[NotificationResponse]
)
def get_notifications(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return notification_repository.get_notifications(
        db=db,
        user_id=current_user.id
    )


from fastapi import HTTPException


@router.put(
    "/{notification_id}/read",
    response_model=NotificationResponse
)
def mark_notification_read(
    notification_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    notification = notification_repository.mark_as_read(
        db=db,
        notification_id=notification_id,
        user_id=current_user.id
    )

    if notification is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return notification


@router.delete("/{notification_id}")
def delete_notification(
    notification_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    deleted = notification_repository.delete_notification(
        db=db,
        notification_id=notification_id,
        user_id=current_user.id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return {
        "message": "Notification deleted successfully"
    }