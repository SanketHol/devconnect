from pydantic import BaseModel
from datetime import datetime


class TrendingPostResponse(BaseModel):
    post_id: int
    caption: str
    image_url: str | None = None

    user_id: int
    owner_name: str

    likes: int
    comments: int
    score: int

    created_at: datetime

    class Config:
        from_attributes = True