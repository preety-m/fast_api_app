from fastapi import APIRouter
from schema.chat import ChatRequest
from services.langchain_service import ask_career_advice

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

@router.post("/")
def chat(request: ChatRequest):
    answer = ask_career_advice(
        session_id=request.session_id,
        user_query=request.message
    )

    return {
        "response": answer
    }