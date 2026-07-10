from pydantic import BaseModel


class FollowUserResponse(BaseModel):
    id: int
    full_name: str
    profile_picture: str | None = None

    class Config:
        from_attributes = True