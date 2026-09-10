from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    question: str
    top_k: int = Field(
        default=3,
        ge=1
    )


class ChatResponse(BaseModel):
    answer: str
    retrieved_context: list[str] = Field(
        default_factory=list
    )