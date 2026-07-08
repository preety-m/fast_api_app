from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.users import User
from utils.token import verify_access_token
from database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
):
  
    result=await db.execute(select(User).filter(User.id==int(user_info["sub"])))
    current_user=result.scalars().first()
   

    if current_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return current_user


def role_required(roles: list):
    def role_decorator(current_user=Depends(get_current_user)):
        if current_user.role not in roles:
            raise HTTPException(
                status_code=403,
                detail="Insufficient permissions"
            )
        return current_user

    return role_decorator