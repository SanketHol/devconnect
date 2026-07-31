from pydantic import BaseModel
from datetime import datetime


class NotificationSender(BaseModel):
    id: int
    full_name: str

    class Config:
        from_attributes = True


class NotificationResponse(BaseModel):

    id: int

    recipient_id: int

    sender_id: int

    post_id: int | None = None

    type: str

    is_read: bool

    created_at: datetime

    sender: NotificationSender

    class Config:
        from_attributes = True