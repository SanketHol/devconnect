from pydantic import BaseModel


class SuggestedUserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    profile_picture: str | None = None
    bio: str | None = None

    class Config:
        from_attributes = True