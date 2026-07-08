from pydantic import BaseModel
from datetime import datetime


class CommentCreate(BaseModel):
    text: str
    post_id: int

    

class CommentUser(BaseModel):
    id: int
    full_name: str

    class Config:
        from_attributes = True



class CommentResponse(BaseModel):

    id: int

    text: str

    created_at: datetime

    user: CommentUser

    class Config:
        from_attributes = True


