from pydantic import BaseModel, Field


class PersonalInformation(BaseModel):
    full_name: str | None = None
    title: str | None = None
    phone: str | None = None
    email: str | None = None
    linkedin: str | None = None
    github: str | None = None
    website: str | None = None


class Experience(BaseModel):
    title: str | None = None
    company: str | None = None
    duration: str | None = None
    description: str | None = None


class Project(BaseModel):
    name: str | None = None
    description: str | None = None
    technologies: list[str] = Field(default_factory=list)


class Skills(BaseModel):
    languages: list[str] = Field(default_factory=list)
    frontend: list[str] = Field(default_factory=list)
    backend: list[str] = Field(default_factory=list)
    databases: list[str] = Field(default_factory=list)
    tools: list[str] = Field(default_factory=list)
    cloud: list[str] = Field(default_factory=list)
    data_engineering: list[str] = Field(default_factory=list)


class ResumeSchema(BaseModel):
    personal_information: PersonalInformation
    education: list[str] = Field(default_factory=list)
    skills: Skills
    experience: list[Experience] = Field(default_factory=list)
    projects: list[Project] = Field(default_factory=list)