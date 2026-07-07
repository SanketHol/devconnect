from fastapi import FastAPI

from app.database import Base, engine

from app.models.user import User
from app.models.post import Post

from app.routers import home
from app.routers import users
from app.routers import posts

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(home.router)
app.include_router(users.router)
app.include_router(posts.router)