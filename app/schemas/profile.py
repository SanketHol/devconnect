from pydantic import BaseModel


class ProfileResponse(BaseModel):
    id: int
    full_name: str
    email: str

    bio: str | None = None
    profile_picture: str | None = None

    posts_count: int

    followers_count: int
    following_count: int

    is_following: bool

    class Config:
        from_attributes = True


class ProfileUpdate(BaseModel):
    full_name: str | None = None
    bio: str | None = None
    profile_picture: str | None = None