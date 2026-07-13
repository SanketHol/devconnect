from fastapi import FastAPI

from app.database import Base, engine

from app.models.user import User
from app.models.post import Post

from app.routers import home
from app.routers import users
from app.routers import posts
from app.models.like import Like
from app.models.follow import Follow
from app.routers import upload
from app.models.notification import Notification

from app.models.comment import Comment
from app.routers.comments import router as comments_router
from app.routers.follows import router as follows_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(home.router)
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(comments_router)
from app.routers.likes import router as likes_router

app.include_router(likes_router)

app.include_router(follows_router)

app.include_router(upload.router)