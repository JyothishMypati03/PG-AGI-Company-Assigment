from pydantic import BaseModel, Field


class MatchResult(BaseModel):
    match_score: float = Field(ge=0, le=100)
    matched_skills: list[str] = Field(default_factory=list)
    missing_skills: list[str] = Field(default_factory=list)
    experience_match: bool
    recommendation: str