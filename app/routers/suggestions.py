from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.utils.auth import get_current_user

from app.repositories import suggestion_repository
from app.schemas.suggestions import SuggestedUserResponse

router = APIRouter(
    prefix="/suggestions",
    tags=["Suggestions"]
)


@router.get(
    "/",
    response_model=List[SuggestedUserResponse]
)
def get_suggestions(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return suggestion_repository.get_suggested_users(
        db,
        current_user.id
    )