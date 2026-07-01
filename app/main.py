# from fastapi import FastAPI
# from app.routers import home
# from app.database import Base, engine
# from app.models.user import User

# app = FastAPI()

# app.include_router(home.router)


from fastapi import FastAPI

from app.database import Base, engine
from app.models.user import User
from app.routers.home import router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(router)