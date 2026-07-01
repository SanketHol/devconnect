from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserRegister
from app.utils.security import hash_password

router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "Welcome to DevConnect 🚀"
    }


@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User Registered Successfully",
        "user_id": new_user.id
    }