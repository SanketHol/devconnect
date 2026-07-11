from pydantic import BaseModel
from datetime import datetime


class PostSearchResponse(BaseModel):
    id: int
    caption: str
    image_url: str | None = None
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True