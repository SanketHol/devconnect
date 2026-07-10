from pydantic import BaseModel


class ProfileResponse(BaseModel):
    id: int
    full_name: str
    email: str
    bio: str | None = None
    profile_picture: str | None = None
    posts_count: int

    class Config:
        from_attributes = True