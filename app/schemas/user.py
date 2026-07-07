from pydantic import BaseModel, EmailStr, Field

class UserRegister(BaseModel):
    full_name: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8, max_length=32)

class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=32)

class UserResponse(BaseModel):
    id: int
    full_name: str

    class Config:
        from_attributes = True