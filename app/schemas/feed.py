from pydantic import BaseModel
from datetime import datetime


class FeedPostResponse(BaseModel):
    id: int
    caption: str
    image_url: str | None = None

    user_id: int
    owner_name: str

    likes_count: int
    comments_count: int

    # NEW FIELD
    is_liked: bool

    created_at: datetime

    class Config:
        from_attributes = True