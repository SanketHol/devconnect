from fastapi import APIRouter
from app.schemas.user import UserRegister

router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "Welcome to DevConnect 🚀"
    }


@router.post("/register")
def register(user: UserRegister):
    return {
        "message": "User Registered Successfully",
        "user": user
    }