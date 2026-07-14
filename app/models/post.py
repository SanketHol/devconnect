from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)

    caption = Column(String, nullable=False)

    image_url = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="posts")

    comments = relationship("Comment", back_populates="post", cascade="all, delete")

    likes = relationship("Like", back_populates="post", cascade="all, delete")

    notifications = relationship(
        "Notification",
        back_populates="post",
        cascade="all, delete"
    )

    saved_by = relationship(
        "SavedPost",
        back_populates="post",
        cascade="all, delete"
    )

