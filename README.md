# UC3 — Gemini Structured Resume Analysis

````markdown
# UC3 — GEMINI STRUCTURED RESUME ANALYSIS

AI Resume & Job Matching System
--------------------------------

Use Case 3: Convert Resume Text into Structured JSON
using Google Gemini API and Pydantic validation.

---

## 1. OBJECTIVE

The objective of UC3 is to take the plain text extracted
from a resume and use Gemini AI to convert that unstructured
text into a well-defined structured JSON format.

This allows the application to understand the resume in a
consistent way and prepares the data for future features such
as job matching, embeddings, semantic search and RAG.

---

# 2. UC3 HIGH-LEVEL FLOW

```text
                  RESUME PDF
                      │
                      ▼
            ┌───────────────────┐
            │       UC2         │
            │  PDF Text Extract │
            └─────────┬─────────┘
                      │
                      ▼
              Resume Plain Text
                      │
                      ▼
            ┌───────────────────┐
            │       UC3         │
            │    Gemini AI      │
            └─────────┬─────────┘
                      │
                      ▼
             Structured JSON
                      │
                      ▼
            ┌───────────────────┐
            │     Pydantic      │
            │    Validation     │
            └─────────┬─────────┘
                      │
                      ▼
              Validated Resume
                      │
                      ▼
                 API Response
````

---

# 3. WHY DO WE NEED UC3?

A resume is normally unstructured text.

Example:

```text
Jyothish Mypati

Software Developer

Skills:
Java, Spring Boot, React, PostgreSQL

Experience:
Software Developer at XYZ

Projects:
AI Resume Analyzer
```

It is difficult for the application to directly use this
text for advanced processing.

UC3 converts it into structured data:

```json
{
  "personal_information": {
    "full_name": "Jyothish Mypati",
    "title": "Software Developer"
  },

  "skills": {
    "languages": ["Java"],
    "backend": ["Spring Boot"],
    "frontend": ["React"],
    "databases": ["PostgreSQL"]
  },

  "experience": [],
  "projects": []
}
```

Now the application can easily search, compare and process
individual resume fields.

---

# 4. UC3 INPUT AND OUTPUT

```text
INPUT
  │
  │
  ▼
Resume Text
  │
  │
  ▼
Gemini AI
  │
  │
  ▼
OUTPUT
  │
  ▼
Structured Resume JSON
```

### Input

```json
{
  "resume_text": "Name: Jyothish Mypati..."
}
```

### Output

```json
{
  "status": "success",
  "data": {
    "personal_information": {},
    "education": [],
    "skills": {},
    "experience": [],
    "projects": []
  }
}
```

---

# 5. API ENDPOINT

## POST /api/resume/analyze

This endpoint accepts resume text and sends it to Gemini
for structured analysis.

### URL

```text
http://127.0.0.1:8000/api/resume/analyze
```

### Method

```text
POST
```

### Content-Type

```text
application/json
```

---

# 6. API REQUEST

Example:

```json
{
  "resume_text": "Name: Jyothish Mypati\nSkills: Java, Spring Boot, React"
}
```

---

# 7. API RESPONSE

Example:

```json
{
  "status": "success",
  "data": {
    "personal_information": {
      "full_name": "Jyothish Mypati",
      "title": null,
      "phone": null,
      "email": null,
      "linkedin": null,
      "github": null,
      "website": null
    },

    "education": [],

    "skills": {
      "languages": [
        "Java"
      ],

      "frontend": [
        "React"
      ],

      "backend": [
        "Spring Boot"
      ],

      "databases": [],

      "tools": [],

      "cloud": [],

      "data_engineering": []
    },

    "experience": [],

    "projects": []
  }
}
```

---

# 8. GEMINI PROCESSING

The application sends a controlled prompt to Gemini.

The prompt tells Gemini:

```text
Extract only information supported by the resume.

Do not invent missing information.

Return personal information,
education,
skills,
experience
and projects.

Return the result as valid JSON.
```

The resume text is then added to the prompt.

```text
             Resume Text
                  │
                  ▼
        ┌──────────────────┐
        │   Resume Prompt  │
        │                  │
        │ Instructions +   │
        │ Resume Text      │
        └────────┬─────────┘
                 │
                 ▼
            Gemini API
                 │
                 ▼
          JSON Response
```

---

# 9. STRUCTURED OUTPUT

UC3 uses Gemini structured output.

The application requests:

```text
application/json
```

and provides:

```text
ResumeSchema
```

to define the expected structure.

```text
              Gemini
                 │
                 ▼
            JSON Output
                 │
                 ▼
        ┌─────────────────┐
        │  ResumeSchema   │
        │                 │
        │ Pydantic Model  │
        └────────┬────────┘
                 │
                 ▼
          Validated Data
```

---

# 10. PYDANTIC SCHEMA

The main schema is:

```text
ResumeSchema
│
├── personal_information
│
├── education
│
├── skills
│
├── experience
│
└── projects
```

---

## Personal Information

```text
PersonalInformation
│
├── full_name
├── title
├── phone
├── email
├── linkedin
├── github
└── website
```

---

## Skills

```text
Skills
│
├── languages
├── frontend
├── backend
├── databases
├── tools
├── cloud
└── data_engineering
```

---

## Experience

```text
Experience
│
├── title
├── company
├── duration
└── description
```

---

## Projects

```text
Project
│
├── name
├── description
└── technologies
```

---

# 11. PROJECT STRUCTURE

```text
RESUME-ANALYSIS/
│
├── README.md
│
├── .gitignore
│
└── backend/
    │
    ├── app/
    │   │
    │   ├── main.py
    │   │
    │   ├── schemas/
    │   │   ├── __init__.py
    │   │   └── resume_schema.py
    │   │
    │   └── services/
    │       ├── __init__.py
    │       ├── pdf_service.py
    │       └── gemini_service.py
    │
    ├── tests/
    │
    ├── requirements.txt
    │
    └── .env
```

### Important

`.env` is a local configuration file.

It must NOT be uploaded to GitHub.

---

# 12. IMPORTANT FILES

## main.py

Responsible for:

```text
API Endpoint
     │
     ▼
Request Validation
     │
     ▼
Gemini Service
     │
     ▼
Response
```

---

## gemini_service.py

Responsible for:

```text
Resume Text
     │
     ▼
Gemini Prompt
     │
     ▼
Gemini API
     │
     ▼
JSON
     │
     ▼
Pydantic Validation
```

---

## resume_schema.py

Responsible for defining the expected structure:

```text
ResumeSchema
     │
     ├── PersonalInformation
     ├── Skills
     ├── Experience
     └── Project
```

---

# 13. RETRY MECHANISM

Temporary AI service failures can occur.

UC3 therefore attempts the Gemini request up to 3 times.

```text
                 Gemini Request
                       │
                       ▼
                  Attempt 1
                       │
                ┌──────┴──────┐
                │             │
              Success        Fail
                │             │
                ▼             ▼
              Return       Attempt 2
                              │
                       ┌──────┴──────┐
                       │             │
                     Success        Fail
                       │             │
                       ▼             ▼
                     Return       Attempt 3
                                    │
                              ┌─────┴─────┐
                              │           │
                           Success       Fail
                              │           │
                              ▼           ▼
                            Return     Error
```

The retry delays are:

```text
Attempt 1 → wait 2 seconds
Attempt 2 → wait 4 seconds
Attempt 3 → return error
```

---

# 14. ERROR HANDLING

UC3 should not expose internal Gemini errors to the client.

If Gemini fails after all retry attempts:

```text
Gemini Error
     │
     ▼
Exception
     │
     ▼
FastAPI catches error
     │
     ▼
HTTP 500
```

Response:

```json
{
  "detail": "Unable to analyze resume"
}
```

The server should continue running.

---

# 15. EMPTY RESUME VALIDATION

If the user sends:

```json
{
  "resume_text": ""
}
```

the API should reject the request.

Expected:

```text
400 Bad Request
```

Response:

```json
{
  "detail": "Resume text is required"
}
```

---

# 16. TEST CASES

## TC3.1 — Normal Resume

### Input

Valid resume text.

### Expected

```text
200 OK
```

Structured resume JSON is returned.

---

## TC3.2 — Missing Email

### Input

Resume without email.

### Expected

```text
200 OK
```

Email should remain:

```text
null
```

The AI must not invent an email address.

---

## TC3.3 — No Projects

### Input

Resume without projects.

### Expected

```json
{
  "projects": []
}
```

No project should be invented.

---

## TC3.4 — Gemini Failure

### Input

Simulated Gemini/API failure.

### Expected

```text
500 Internal Server Error
```

Response:

```json
{
  "detail": "Unable to analyze resume"
}
```

Backend should remain running.

---

## TC3.5 — Empty Resume

### Input

```json
{
  "resume_text": ""
}
```

### Expected

```text
400 Bad Request
```

---

# 17. UC2 → UC3 INTEGRATION

UC3 uses the output of UC2.

```text
             RESUME PDF
                 │
                 ▼
        ┌─────────────────┐
        │       UC2       │
        │ PDF Extraction  │
        └────────┬────────┘
                 │
                 ▼
           Resume Text
                 │
                 ▼
        ┌─────────────────┐
        │       UC3       │
        │   Gemini AI     │
        └────────┬────────┘
                 │
                 ▼
        Structured Resume
                 │
                 ▼
        Pydantic Validation
                 │
                 ▼
           JSON Response
```

This is the first major AI processing stage of the project.

---

# 18. ENVIRONMENT CONFIGURATION

Create:

```text
backend/.env
```

Add:

```text
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

The actual API key should never be written directly
inside Python source code.

The `.env` file should be ignored by Git.

---

# 19. REQUIRED PACKAGES

UC3 requires the Gemini SDK and environment variable support.

Install:

```bash
pip install google-genai
pip install python-dotenv
```

Or install everything:

```bash
pip install -r requirements.txt
```

---

# 20. RUN THE APPLICATION

Go to:

```text
RESUME-ANALYSIS/backend
```

Activate virtual environment:

```powershell
.venv\Scripts\activate
```

Run FastAPI:

```bash
uvicorn app.main:app --reload
```

Open Swagger:

```text
http://127.0.0.1:8000/docs
```

---

# 21. TESTING THROUGH SWAGGER

Open:

```text
POST /api/resume/analyze
```

Click:

```text
Try it out
```

Enter:

```json
{
  "resume_text": "Name: Jyothish Mypati\nSkills: Java, Spring Boot, React"
}
```

Click:

```text
Execute
```

Expected:

```text
200 OK
```

---

# 22. COMPLETE SYSTEM PROGRESS

```text
UC1
Basic FastAPI
   │
   ▼
UC2
PDF Text Extraction
   │
   ▼
UC3
Gemini Structured Analysis
   │
   ▼
UC4
Job Description Processing
   │
   ▼
UC5
Embeddings + Vector DB
   │
   ▼
UC6
Semantic Search
   │
   ▼
UC7
RAG
   │
   ▼
UC8
Resume / Job Matching
   │
   ▼
UC9
AI Career Assistant
   │
   ▼
UC10
React Dashboard
```

---

# 23. CURRENT STATUS

```text
UC1  Basic FastAPI Backend              [DONE]

UC2  Resume PDF Extraction              [DONE]

UC3  Gemini Structured Analysis         [CURRENT]

UC4  Job Description Processing         [NEXT]

UC5  Embeddings + Vector Database       [PENDING]

UC6  Semantic Job Search                [PENDING]

UC7  RAG                                [PENDING]

UC8  Resume / Job Matching              [PENDING]

UC9  AI Career Assistant                [PENDING]

UC10 React Dashboard                    [PENDING]
```

---

# 24. GIT BRANCH

UC3 branch:

```text
uc3-gemini-structured-resume
```

Recommended commit:

```text
feat: implement UC3 structured resume analysis
```

Git workflow:

```text
main
 │
 └── dev
      │
      ├── uc1-basic-fastapi
      │
      ├── uc2-pdf-extraction
      │
      └── uc3-gemini-structured-resume
```

After UC3 testing is complete:

```text
UC3 Branch
     │
     ▼
Commit
     │
     ▼
Push to GitHub
     │
     ▼
Merge into dev
```

---

# 25. DEVELOPMENT PRINCIPLES

This project follows a use-case based development approach.

Each use case should have:

```text
Use Case
   │
   ├── Implementation
   │
   ├── Happy Tests
   │
   ├── Sad Tests
   │
   ├── Error Handling
   │
   ├── Git Commit
   │
   └── Merge into dev
```

Important principles:

* Keep use cases separated.
* Write readable code.
* Use meaningful names.
* Validate external AI responses.
* Never expose API keys.
* Handle errors gracefully.
* Test before committing.
* Keep Git commits focused.
* Avoid unnecessary code duplication.

---

# END OF UC3

````

### Recommended file location

Because this is specifically the **UC3 documentation**, I suggest:

```text
RESUME-ANALYSIS/
│
├── README.md                  ← Overall project
│
└── backend/
    └── README_UC3.md          ← UC3 detailed documentation
````