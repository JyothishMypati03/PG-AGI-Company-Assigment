# UC4 — Job Description Processing

## Objective

Convert an unstructured job description into structured JSON using Gemini AI.

### Flow

```text
Job Description
      ↓
   FastAPI
      ↓
Gemini Service
      ↓
   Gemini AI
      ↓
  JobSchema
      ↓
Structured Job JSON
```

## Extracted Information

```text
Job Title
Company
Required Skills
Preferred Skills
Experience Required
Responsibilities
```

### Example

```json
{
  "job_title": "Java Backend Developer",
  "company": null,
  "required_skills": ["Java", "Spring Boot", "SQL"],
  "preferred_skills": ["Docker", "AWS"],
  "experience_required": "0-2 years",
  "responsibilities": []
}
```

## API

```text
POST /api/job/analyze
```

Request:

```json
{
  "job_description": "Java Backend Developer with 0-2 years experience..."
}
```

## Key Engineering Decision

UC4 **reuses the Gemini service from UC3** instead of duplicating Gemini API code.

```text
             Gemini Service
              /          \
             /            \
        UC3 Resume       UC4 Job
          ↓                ↓
    ResumeSchema        JobSchema
```

## Tests

```text
✓ Normal job description
✓ Missing company
✓ Empty description
✓ No preferred skills
✓ Ambiguous description
✓ Gemini failure
```

## Project Structure

```text
backend/
├── app/
│   ├── main.py
│   ├── schemas/
│   │   ├── resume_schema.py
│   │   └── job_schema.py
│   └── services/
│       ├── pdf_service.py
│       └── gemini_service.py
└── README_UC4.md
```

## Git

**Branch:**

```text
uc4-job-description
```

**Commit:**

```text
feat: implement UC4 job description processing
```

### Next

**UC5 — Embeddings + Vector Database**
