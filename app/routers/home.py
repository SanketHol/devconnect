from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserRegister, UserLogin
from app.utils.security import (
    hash_password,
    verify_password
)
from app.utils.jwt import create_access_token
from app.utils.auth import get_current_user
from fastapi.security import OAuth2PasswordRequestForm

from app.schemas.post import PostCreate
from app.models.post import Post
from typing import List
from app.schemas.post import PostResponse

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



@router.post("/login")
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


@router.post("/posts")
def create_post(
    post: PostCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    new_post = Post(
        caption=post.caption,
        image_url=post.image_url,
        user_id=current_user.id
    )

    db.add(new_post)

    db.commit()

    db.refresh(new_post)

    return {
        "message": "Post created successfully",
        "post_id": new_post.id
    }


@router.get(
    "/posts",
    response_model=List[PostResponse]
)
def get_posts(
    db: Session = Depends(get_db)
):

    posts = (
        db.query(Post)
        .order_by(Post.created_at.desc())
        .limit(10)
        .all()
    )

    return posts