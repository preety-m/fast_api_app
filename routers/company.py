from fastapi import APIRouter
router= APIRouter(prefix="/company",tags={"company"})

@router.get("/")
def read_company():
    return {"company":"Company root"}


