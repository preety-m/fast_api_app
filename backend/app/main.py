from fastapi import FastAPI
from routers import job,auth,company,chat
#from routers import rag
from models import job as job_model, company as company_model,users as user_model
from database import Base, engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
@app.on_event("startup")
async def startup_event():
   from database import engine
   async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

#Base.metadata.create_all(bind=job_model.engine)
app.include_router(auth.router)
app.include_router(company.router)
app.include_router(job.router)
app.include_router(chat.router)
# app.include_router(rag.router)
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/about")
def read_about():
    return {"About": "This is a FastAPI application."}

@app.get("/contact")
def read_contact():
    return {"Contact": "preetydevim2004@gmail.com"} 
