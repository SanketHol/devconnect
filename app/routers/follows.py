from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.utils.auth import get_current_user
from app.repositories import follow_repository
from typing import List
from app.schemas.follow import FollowUserResponse


router = APIRouter(
    prefix="/follows",
    tags=["Follows"]
)


@router.post("/{user_id}")
def follow_user(
    user_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # Can't follow yourself
    if current_user.id == user_id:
        raise HTTPException(
            status_code=400,
            detail="You cannot follow yourself."
        )

    # Check target user exists
    user = follow_repository.get_user(
        db,
        user_id
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    # Already following?
    follow = follow_repository.get_follow(
        db,
        current_user.id,
        user_id
    )

    if follow:
        raise HTTPException(
            status_code=400,
            detail="Already following this user."
        )

    follow_repository.create_follow(
        db,
        current_user.id,
        user_id
    )

    return {
        "message": "User followed successfully."
    }


@router.delete("/{user_id}")
def unfollow_user(
    user_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    follow = follow_repository.get_follow(
        db,
        current_user.id,
        user_id
    )

    if follow is None:
        raise HTTPException(
            status_code=404,
            detail="You are not following this user."
        )

    follow_repository.delete_follow(
        db,
        follow
    )

    return {
        "message": "User unfollowed successfully."
    }

@router.get(
    "/followers/{user_id}",
    response_model=List[FollowUserResponse]
)
def get_followers(
    user_id: int,
    db: Session = Depends(get_db)
):

    return follow_repository.get_followers(
        db,
        user_id
    )

@router.get(
    "/following/{user_id}",
    response_model=List[FollowUserResponse]
)
def get_following(
    user_id: int,
    db: Session = Depends(get_db)
):

    return follow_repository.get_following(
        db,
        user_id
    )