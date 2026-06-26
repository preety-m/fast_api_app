from fastapi import APIRouter
from schema.job import JobCreate,JobUpdate
router = APIRouter(prefix="/job", tags={"job"})
job = []

@router.get("/")
def read_job():
    return {"job": "Job root"}

@router.get("/{job_id}")
def read_job_by_id(job_id: int):
    return {"job_id": job_id}   

@router.put("/{job_id}")
def update_job(job_id:int,job:JobUpdate):
    job[job_id]=job
    return job
@router.delete("/{job_id}")
def delete_job(job_id:int):
    job.pop(job_id)
    return job
