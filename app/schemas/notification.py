from pydantic import BaseModel
from datetime import datetime


class NotificationResponse(BaseModel):

    id: int

    recipient_id: int

    sender_id: int

    post_id: int | None = None

    type: str

    is_read: bool

    created_at: datetime

    class Config:
        from_attributes = True