from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserRegister
from app.utils.security import hash_password, verify_password
from app.utils.jwt import create_access_token
from app.utils.auth import get_current_user
from app.schemas.profile import (
    ProfileResponse,
    ProfileUpdate
)
from app.models.post import Post
from fastapi import HTTPException
from app.repositories import user_repository
from typing import List

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


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



@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    db_user = (
        db.query(User)
        .filter(User.email == form_data.username)
        .first()
    )

    if not db_user:
        return {
            "message": "Invalid email or password"
        }

    if not verify_password(
        form_data.password,
        db_user.password
    ):
        return {
            "message": "Invalid email or password"
        }

    access_token = create_access_token(
        data={
        "sub": str(db_user.id)
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.get("/me")
def get_me(
    current_user = Depends(get_current_user)
):

    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email
    }


@router.get("/search")
def search_users(
    query: str,
    db: Session = Depends(get_db)
):

    return user_repository.search_users(
        db,
        query
    )


@router.get(
    "/{user_id}",
    response_model=ProfileResponse
)
def get_profile(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    posts_count = (
        db.query(Post)
        .filter(Post.user_id == user.id)
        .count()
    )

    return {
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "bio": user.bio,
        "profile_picture": user.profile_picture,
        "posts_count": posts_count
    }


@router.put("/me")
def update_profile(
    profile: ProfileUpdate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    update_data = profile.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(current_user, key, value)

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile updated successfully"
    }