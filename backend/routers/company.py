from fastapi import APIRouter, HTTPException, Depends, status
from schema.company import CompanyCreate, CompanyUpdate, CompanyResponse
from models.company import Company
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter(prefix="/company", tags=["company"])


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=CompanyResponse)
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    new_company = Company(**company.model_dump())

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    return new_company


@router.get("/", response_model=list[CompanyResponse])
def get_all_company(db: Session = Depends(get_db)):
    return db.query(Company).all()


@router.get("/{company_id}", response_model=CompanyResponse)
def get_company(company_id: int, db: Session = Depends(get_db)):
    db_company = db.query(Company).filter(Company.id == company_id).first()

    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")

    return db_company


@router.put("/{company_id}", response_model=CompanyResponse)
def update_company(company_id: int, company: CompanyUpdate, db: Session = Depends(get_db)):
    db_company = db.query(Company).filter(Company.id == company_id).first()

    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")

    if company.name is not None:
        db_company.name = company.name

    if company.email is not None:
        db_company.email = company.email

    if company.phone is not None:
        db_company.phone = company.phone
    if company.location is not None:
        db_company.location = company.location

    db.commit()
    db.refresh(db_company)

    return db_company


@router.delete("/{company_id}")
def delete_company(company_id: int, db: Session = Depends(get_db)):
    db_company = db.query(Company).filter(Company.id == company_id).first()

    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")

    db.delete(db_company)
    db.commit()

    return {"message": "Company deleted successfully"}