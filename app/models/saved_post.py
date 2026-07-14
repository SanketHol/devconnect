from sqlalchemy import Column, Integer, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class SavedPost(Base):
    __tablename__ = "saved_posts"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "post_id",
            name="unique_saved_post"
        ),
    )

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    post_id = Column(
        Integer,
        ForeignKey("posts.id")
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user = relationship(
        "User",
        back_populates="saved_posts"
    )

    post = relationship(
        "Post",
        back_populates="saved_by"
    )