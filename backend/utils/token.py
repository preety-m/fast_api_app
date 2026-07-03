from fastapi import HTTPException
from jose import jwt 
from datetime import datetime, timedelta
from schema.token import Token
from dotenv import load_dotenv
import os
from models.users import User
from database import get_db
from sqlalchemy.orm import Session
load_dotenv()
SCERET_KEY=os.getenv("SECRET_KEY")
ALGORITHM="HS256"

def create_access_token(data: dict, expires_delta: timedelta =timedelta(hours=2)):
    to_encode = data.copy()
    
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, key=SCERET_KEY, algorithm=ALGORITHM)
    return encoded_jwt 
def verify_access_token(token:str,db:Session):
    to_decode=jwt.decode(token,key=SCERET_KEY,algorithms=[ALGORITHM])
    current_user = db.query(User).filter(User.id == to_decode["user_id"]).first()
    if current_user is None:
        raise HTTPException(status_code=401,detail="invalid credentials")
    return current_user
    