from pydantic import BaseModel
from datetime import datetime


class SavePostRequest(BaseModel):
    post_id: int


class SavedPostResponse(BaseModel):
    id: int
    post_id: int
    caption: str
    image_url: str | None = None
    owner_name: str
    created_at: datetime

    class Config:
        from_attributes = True