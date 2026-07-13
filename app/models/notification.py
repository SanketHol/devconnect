from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Notification(Base):

    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)

    recipient_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    sender_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    post_id = Column(
        Integer,
        ForeignKey("posts.id"),
        nullable=True
    )

    type = Column(
        String,
        nullable=False
    )

    is_read = Column(
        Boolean,
        default=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    recipient = relationship(
        "User",
        foreign_keys=[recipient_id],
        back_populates="notifications_received"
    )

    sender = relationship(
        "User",
        foreign_keys=[sender_id],
        back_populates="notifications_sent"
    )

    post = relationship(
        "Post",
        back_populates="notifications"
    )