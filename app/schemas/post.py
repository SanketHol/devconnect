from datetime import datetime
from pydantic import BaseModel


class PostCreate(BaseModel):
    caption: str
    image_url: str | None = None


class PostResponse(BaseModel):
    id: int
    caption: str
    image_url: str | None
    created_at: datetime

    class Config:
        from_attributes = True