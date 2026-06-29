from fastapi import FastAPI
from database import Base, engine

# Import the model modules so SQLAlchemy registers BOTH models
import models.company
import models.job

from routers import company, job

app = FastAPI()

#Base.metadata.create_all(bind=engine)

app.include_router(company.router)
app.include_router(job.router)


@app.get("/")
def read_root():
    return {"Hello": "world"}


@app.get("/about")
def read_about():
    return {"about": "This is about page"}


@app.get("/contact")
def read_contact():
    return {"contact": "preetydevim2004@gmail.com"}
