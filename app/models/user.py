from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    posts = relationship("Post", back_populates="user", cascade="all, delete")

    comments = relationship("Comment", back_populates="user")

    likes = relationship("Like", back_populates="user", cascade="all, delete")

    bio = Column(String, nullable=True)

    profile_picture = Column(String, nullable=True)

    following = relationship("Follow", foreign_keys="Follow.follower_id",  back_populates="follower", cascade="all, delete-orphan")

    followers = relationship("Follow", foreign_keys="Follow.following_id", back_populates="following", cascade="all, delete-orphan")

    