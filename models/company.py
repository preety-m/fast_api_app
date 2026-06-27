from sqlalchemy import Column, Integer, String,Enum,relationship
from database import Base ,engine,SessionLocal



class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False, index=True)
    email = Column(String, unique=True)
    phone_number = Column(String, unique=True)
    address = Column(String, index=True)
    jobs=relationship("Job",back_populates="company")
