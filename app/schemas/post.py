from datetime import datetime
from pydantic import BaseModel
from app.schemas.user import UserResponse
from app.schemas.comment import CommentResponse

class PostCreate(BaseModel):
    caption: str
    image_url: str | None = None


class PostResponse(BaseModel):
    id: int
    caption: str
    image_url: str | None
    created_at: datetime

    user: UserResponse
    comments: list[CommentResponse] = []

    class Config:
        from_attributes = True