from datetime import datetime
from pydantic import BaseModel
from app.schemas.user import UserResponse


class PostCreate(BaseModel):
    caption: str
    image_url: str | None = None


class PostResponse(BaseModel):
    id: int
    caption: str
    image_url: str | None
    created_at: datetime

    user: UserResponse

    class Config:
        from_attributes = True