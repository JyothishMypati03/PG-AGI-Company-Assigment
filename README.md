# AI Resume & Job Matching System

An AI-powered Resume Analysis and Job Matching application that analyzes resumes, understands job descriptions, performs semantic job search using vector embeddings, compares resumes with jobs, identifies skill gaps, and provides an AI-powered career assistant using Retrieval-Augmented Generation (RAG).

The project is built as a full-stack application using:

- Python
- FastAPI
- React
- Gemini API
- Sentence Transformers
- ChromaDB
- Pydantic
- PDF text extraction
- REST APIs
- Retrieval-Augmented Generation (RAG)

---

# 1. Project Overview

Finding suitable jobs manually can be difficult because a candidate may have many skills, projects, technologies, and experiences that need to be compared with different job descriptions.

This project automates that process.

The application allows a user to:

1. Upload a resume PDF.
2. Extract text from the resume.
3. Analyze the resume using Gemini AI.
4. Convert the resume into structured information.
5. Search jobs using natural language.
6. Convert job-search queries into embeddings.
7. Retrieve semantically similar jobs from ChromaDB.
8. Analyze job descriptions using Gemini.
9. Compare the resume with a selected job.
10. Calculate a transparent match score.
11. Identify matched skills.
12. Identify missing skills.
13. Compare experience and education.
14. Ask career-related questions through an AI Career Chat.
15. Use retrieved job information as context for AI-generated answers.

The final goal is to provide a single platform that helps a candidate understand:

- What skills they already have.
- Which jobs are relevant.
- How well their resume matches a job.
- Which skills are missing.
- What they should learn next.
- Why a particular job may or may not be a good match.

---

# 2. Main Objective

The main objective of this project is to build an AI-powered career assistant that combines:

```text
Resume Analysis
        +
Job Analysis
        +
Semantic Search
        +
Vector Database
        +
Resume-Job Matching
        +
RAG
        +
AI Career Chat
        +
React Dashboard

Instead of depending only on keyword matching, the system uses embeddings and semantic similarity to retrieve relevant jobs.

The project also uses deterministic matching logic for the final resume-job comparison so that the match score is transparent and explainable.

3. Key Features
Resume Features
Upload resume PDF.
Validate uploaded file.
Extract text from PDF.
Analyze resume using Gemini.
Convert unstructured resume text into structured JSON.
Display:
Personal information
Skills
Education
Experience
Projects
Job Features
Accept natural-language job-search queries.
Generate embeddings for search queries.
Search jobs using semantic similarity.
Return Top-K relevant jobs.
Analyze job descriptions using Gemini.
Extract:
Job title
Company
Required skills
Preferred skills
Experience
Education
Responsibilities
Matching Features

The system compares:

Resume
   +
Job
   ↓
Skill Matching
   ↓
Experience Matching
   ↓
Education Matching
   ↓
Final Match Score

The system provides:

Match score
Skill score
Experience score
Education score
Matched skills
Missing skills
Experience match
Education match
Recommendation
AI Career Chat

The application also provides an AI-powered career assistant.

Example questions:

Why is this job a good match for me?

Which required skills am I missing?

What should I learn next?

Which jobs require Spring Boot?

Why is this Data Engineer role not a strong match?

The chat system uses:

User Question
      ↓
Embedding
      ↓
ChromaDB
      ↓
Relevant Jobs
      ↓
Resume Context + Job Context
      ↓
Gemini
      ↓
AI Career Answer
4. Technology Stack
Backend
Technology	Purpose
Python	Backend programming language
FastAPI	REST API framework
Uvicorn	ASGI server
Pydantic	Request/response validation
pypdf	PDF text extraction
Google Gemini	AI analysis and generation
python-dotenv	Environment variables
Sentence Transformers	Text embeddings
ChromaDB	Vector database
Frontend
Technology	Purpose
React	Frontend UI
Vite	React development/build tool
JavaScript	Frontend programming
CSS	Styling
Fetch API	Backend API communication
AI / Vector Components
Gemini
   ↓
Structured AI analysis
   +
RAG generation

Sentence Transformer
   ↓
Text Embedding
   ↓
ChromaDB
   ↓
Semantic Retrieval
5. High-Level Architecture
                         USER
                           |
                           v
                  +----------------+
                  | React Frontend |
                  +----------------+
                           |
                           | REST API
                           v
                  +----------------+
                  | FastAPI Backend|
                  +----------------+
                     /     |      \
                    /      |       \
                   v       v        v
              PDF Service Gemini   Match
                 |          |        |
                 v          v        v
              Resume     Structured  Score
               Text        Data
                            |
                            v
                    Embedding Service
                            |
                            v
                       ChromaDB
                            |
                            v
                    Semantic Retrieval
                            |
                            v
                           RAG
                            |
                            v
                         Gemini
                            |
                            v
                      AI Response
6. Complete User Journey

The complete application workflow is:

1. Upload Resume
        ↓
2. Extract PDF Text
        ↓
3. Analyze Resume with Gemini
        ↓
4. Create Structured Resume
        ↓
5. Search for Jobs
        ↓
6. Generate Query Embedding
        ↓
7. Retrieve Relevant Jobs
        ↓
8. Select Job
        ↓
9. Analyze Job Description
        ↓
10. Match Resume with Job
        ↓
11. Calculate Match Score
        ↓
12. Show Skill Gap
        ↓
13. Ask AI Career Questions
        ↓
14. Retrieve Relevant Job Context
        ↓
15. Generate RAG Answer
7. Project Structure

The project is organized into frontend and backend components.

RESUME-ANALYSIS/
│
├── README.md
│
├── .gitignore
│
├── backend/
│   │
│   ├── app/
│   │   │
│   │   ├── main.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── resume_schema.py
│   │   │   ├── job_schema.py
│   │   │   └── match_schema.py
│   │   │
│   │   └── services/
│   │       ├── __init__.py
│   │       ├── pdf_service.py
│   │       ├── gemini_service.py
│   │       ├── embedding_service.py
│   │       ├── vector_service.py
│   │       ├── rag_service.py
│   │       ├── match_service.py
│   │       └── chat_service.py
│   │
│   ├── tests/
│   │
│   ├── requirements.txt
│   │
│   └── .env
│
└── frontend/
    │
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   └── ...
    │
    ├── package.json
    └── ...
8. Backend Folder Explanation
app/main.py

This is the main FastAPI application.

It contains:

FastAPI application creation.
CORS configuration.
API endpoints.
Request models.
Integration with service classes/functions.
9. Services

The service layer separates application logic.

pdf_service.py

Responsible for:

PDF
 ↓
Text Extraction

Uses pypdf.

gemini_service.py

Responsible for AI operations such as:

Resume analysis.
Job description analysis.
RAG answer generation.
embedding_service.py

Responsible for:

Text
 ↓
Sentence Transformer
 ↓
Embedding Vector

The project currently uses:

all-MiniLM-L6-v2

The model produces a 384-dimensional embedding vector.

vector_service.py

Responsible for:

ChromaDB connection.
Storing documents.
Searching similar documents.
rag_service.py

Responsible for:

Question
 ↓
Embedding
 ↓
Vector Search
 ↓
Job Context
 ↓
Gemini
 ↓
Answer
match_service.py

Responsible for deterministic resume-job matching.

It handles:

Skill comparison.
Skill normalization.
Experience comparison.
Education comparison.
Match score calculation.
Recommendation generation.
chat_service.py

Responsible for the AI Career Chat.

It combines:

Resume Context
+
User Question
+
Retrieved Jobs
+
Gemini
10. Schemas

The schemas define the structure of application data.

ResumeSchema

The structured resume contains:

Personal Information
Education
Skills
Experience
Projects

Skills are separated into:

Languages
Frontend
Backend
Databases
Tools
Cloud
Data Engineering
JobSchema

A job contains:

Job Title
Company
Required Skills
Preferred Skills
Experience Required
Education Required
Responsibilities
MatchResult

A match result contains:

Match Score
Skill Score
Experience Score
Education Score
Matched Skills
Missing Skills
Experience Match
Education Match
Recommendation
11. Environment Setup
Prerequisites

Install:

Python
Node.js
npm
Git

You also need a Gemini API key.

12. Clone the Repository
git clone https://github.com/JyothishMypati03/PG-AGI-Company-Assigment.git

Navigate into the project:

cd PG-AGI-Company-Assigment
13. Backend Setup

Navigate to backend:

cd backend

Create a virtual environment:

python -m venv .venv

Activate it on Windows:

.venv\Scripts\activate
14. Install Backend Dependencies

Install dependencies:

pip install -r requirements.txt

Important packages include:

fastapi
uvicorn
pydantic
pypdf
google-genai
python-dotenv
chromadb
sentence-transformers
15. Environment Variables

Create:

backend/.env

Add:

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

Do not commit the real API key.

The .env file should remain ignored by Git.

16. Start Backend

From the backend directory:

uvicorn app.main:app --reload

The backend will run at:

http://127.0.0.1:8000
17. FastAPI Swagger Documentation

Open:

http://127.0.0.1:8000/docs

Swagger provides an interactive interface for testing the APIs.

18. Frontend Setup

Open another terminal.

Navigate to the project:

cd frontend

Install dependencies:

npm install

Start React:

npm run dev

The frontend normally runs at:

http://localhost:5173
19. CORS Configuration

The backend allows the React development servers:

http://localhost:5173
http://127.0.0.1:5173

This allows the browser to communicate with FastAPI during local development.

20. Use Case Development Methodology

The project was developed incrementally using independent use cases.

UC1 → Basic Backend
UC2 → PDF Extraction
UC3 → Resume AI Analysis
UC4 → Job Analysis
UC5 → Embeddings + Vector DB
UC6 → Semantic Job Search
UC7 → RAG
UC8 → Resume-Job Matching
UC9 → AI Career Chat
UC10 → React Dashboard

Each use case focuses on one major responsibility.

This makes the project easier to:

Develop.
Test.
Debug.
Review.
Commit.
Maintain.
21. UC1 — Basic FastAPI Backend
Objective

Create the basic FastAPI backend.

Endpoint
GET /api/health
Request

No request body is required.

Response
{
  "status": "success",
  "message": "Resume AI Backend is running"
}
Swagger
GET /docs
Testing

Happy test:

GET /api/health

Expected:

200 OK

Sad test:

GET /api/hello

Expected:

404 Not Found
22. UC2 — Resume PDF Extraction
Objective

Allow the user to upload a resume PDF and extract its text.

Flow
Resume PDF
    ↓
FastAPI Upload
    ↓
PDF Validation
    ↓
pypdf
    ↓
Extracted Text
Endpoint
POST /api/resume/upload
Input

Multipart form-data:

file = resume.pdf
Output

The endpoint returns the extracted resume text.

Tests

Test cases include:

Valid PDF
Missing file
TXT file
DOCX file
Corrupted PDF
Multi-page PDF
23. UC3 — Gemini Structured Resume Analysis
Objective

Convert unstructured resume text into structured JSON.

Flow
Resume Text
     ↓
Gemini
     ↓
Structured JSON
     ↓
Pydantic Validation
Endpoint
POST /api/resume/analyze
Request
{
  "resume_text": "Java developer with experience in Spring Boot..."
}
Response Structure
personal_information
education
skills
experience
projects
AI Responsibilities

Gemini extracts only information supported by the resume.

The system instructs the model not to invent unsupported information.

Structured output is validated using the Pydantic ResumeSchema.

24. UC4 — Job Description Processing
Objective

Convert an unstructured job description into structured job information.

Flow
Job Description
       ↓
Gemini
       ↓
Structured Job JSON
Endpoint
POST /api/job/analyze
Example Input
{
  "job_description": "We are looking for a Java Backend Developer..."
}
Extracted Information
Job Title
Company
Required Skills
Preferred Skills
Experience
Education
Responsibilities
25. UC5 — Embeddings and Vector Database
Objective

Convert text into numerical vectors and store/search them using ChromaDB.

Embedding Model
all-MiniLM-L6-v2

Output:

384-dimensional vector
Flow
Text
 ↓
Sentence Transformer
 ↓
Embedding
 ↓
ChromaDB
ChromaDB

The project uses a persistent local ChromaDB database.

The database is stored under:

backend/app/vector_db/

This directory is ignored by Git.

26. Sample Jobs

The vector database was tested using sample jobs such as:

job_101
Java Backend Developer
Spring Boot
SQL
job_102
Java Microservices Developer
Spring Cloud
REST APIs
job_103
Python Data Engineer
PySpark
Databricks
job_104
Frontend Developer
React
JavaScript
job_105
Java Developer
PostgreSQL
Hibernate

These jobs are used to test semantic retrieval.

27. UC6 — Semantic Job Search
Objective

Allow the user to search jobs using natural language.

Flow
User Query
     ↓
Embedding
     ↓
ChromaDB
     ↓
Similarity Search
     ↓
Top-K Jobs
Endpoint
POST /api/jobs/search
Example Request
{
  "query": "Java backend developer with Spring",
  "top_k": 3
}
Response

The API returns:

Job ID
Job Text
Metadata
Distance
Important Concept

Semantic similarity does not automatically mean that a job is suitable for the candidate.

The vector database retrieves the closest jobs according to vector similarity.

Actual candidate-job suitability is handled separately by the matching logic.

28. UC7 — Retrieval-Augmented Generation
Objective

Combine retrieved job information with Gemini generation.

What is RAG?

RAG means:

Retrieval
+
Augmentation
+
Generation
Project RAG Flow
Question
   ↓
Embedding
   ↓
ChromaDB
   ↓
Relevant Jobs
   ↓
Resume Context + Job Context
   ↓
Gemini
   ↓
Answer
Endpoint
POST /api/rag/answer
Example Request
{
  "resume_context": "Java developer with Spring Boot and PostgreSQL.",
  "question": "How well does this job match my skills?",
  "top_k": 3
}
RAG Prompt

The backend provides Gemini with:

Resume Context
Job Context
Question

The AI is instructed to:

Answer using the provided context.
Avoid unsupported facts.
Avoid inventing information.
29. UC8 — Resume and Job Matching
Objective

Compare a structured resume with a structured job.

Flow
Resume
   +
Job
   ↓
Skill Matching
   ↓
Experience Matching
   ↓
Education Matching
   ↓
Weighted Score
   ↓
Recommendation
Endpoint
POST /api/match
30. Match Score Formula

The project uses:

Final Score =
    Skill Score       × 60%
  + Experience Score  × 25%
  + Education Score   × 15%

Mathematically:

final_score =
    skill_score * 0.60
    +
    experience_score * 0.25
    +
    education_score * 0.15
31. Skill Matching

The system extracts resume skills from:

Languages
Frontend
Backend
Databases
Tools
Cloud
Data Engineering

Required job skills are compared with resume skills.

Example:

Resume:

Java
Spring Boot
PostgreSQL

Job:

Java
Spring Boot
SQL

Matched:

Java
Spring Boot
SQL

Depending on normalization rules, related skills can be treated as equivalent.

32. Skill Normalization

The project contains skill aliases such as:

PostgreSQL → SQL
MySQL      → SQL
MariaDB    → SQL

REST API   → REST
REST APIs  → REST

Spring     → Spring Boot

This helps reduce false mismatches.

33. Experience Matching

The system extracts years from:

Job experience requirement
+
Resume experience duration

Example:

Job:

0-2 years

Candidate:

1 year

Result:

Experience Match = true
34. Education Matching

The system compares:

Job education requirement
+
Resume education

It currently handles common patterns such as:

Bachelor
B.Tech
B.E
Master
M.Tech
M.E
Computer Science
35. Match Recommendations

The system produces:

Score >= 80
    ↓
Good match
Score >= 60
    ↓
Moderate match
Score < 60
    ↓
Low match

The match score is a project-defined match indicator.

It is not:

Hiring probability

and should not be interpreted as a guarantee of selection.

36. UC9 — AI Career Chat
Objective

Provide a career assistant that can answer questions using the candidate's resume and relevant job information.

Endpoint
POST /api/chat
Example Request
{
  "resume_context": "Java developer with 1 year of experience. Skills: Java, Spring Boot, React, PostgreSQL, SQL, Git and REST APIs. B.Tech in Computer Science.",
  "question": "Why is a Java backend developer job a good match for me?",
  "top_k": 3
}
Flow
Resume Context
      +
Question
      ↓
Query Embedding
      ↓
ChromaDB
      ↓
Relevant Jobs
      ↓
Resume + Job Context
      ↓
Gemini
      ↓
Career Answer
37. AI Career Chat Questions

Example questions:

Why is this job a good match for me?
Which required skills am I missing?
What should I learn next?
Which jobs require Spring Boot?
Why is this Data Engineer role not a strong match?
38. History vs Retrieval

Two concepts are important in the chat system.

Chat History

Previous conversation messages.

Example:

User:
What are my missing skills?

AI:
You are missing Docker and AWS.

User:
How should I learn Docker?

The second question depends on the previous conversation.

Retrieval

Retrieval means searching stored information for relevant context.

Example:

Question:
Java backend jobs

        ↓

Vector Search

        ↓

Relevant Java jobs

These are different concepts.

The current simple implementation focuses on question-based retrieval and resume context.

Conversation history can be extended later.

39. UC10 — React Dashboard
Objective

Build a complete frontend that connects all backend capabilities.

Main Screens / Sections
1. Resume Upload
2. Resume Dashboard
3. Job Search
4. Job Match
5. Skill Gap
6. AI Career Chat
40. Resume Upload

The user selects a PDF resume.

The frontend sends:

POST /api/resume/upload

The backend extracts the text.

The extracted text is then sent to:

POST /api/resume/analyze

Gemini returns structured resume information.

41. Resume Dashboard

The dashboard displays:

Personal Information
Skills
Education
Experience
Projects

This allows the user to see how the AI understood the uploaded resume.

42. Job Search UI

The user enters a natural-language query.

Example:

Java backend developer with Spring Boot

React sends:

POST /api/jobs/search

The backend:

Query
 ↓
Embedding
 ↓
ChromaDB
 ↓
Top-K Jobs

The results are displayed in the UI.

43. Job Matching UI

The user selects:

Check Match

The frontend:

Sends the job description to Gemini.
Receives structured job information.
Sends resume + structured job to /api/match.
Displays the result.
44. Match Dashboard

The frontend displays:

Match Score
Skill Score
Experience Score
Education Score

and:

Matched Skills
Missing Skills
Experience Match
Education Match
Recommendation
45. Skill Gap

The skill gap section highlights missing skills.

Example:

Your Skills:

Java
Spring Boot
SQL

Required:

Java
Spring Boot
SQL
Docker
AWS

Skill gap:

Docker
AWS

This can help the candidate decide what to learn next.

46. AI Career Chat UI

The dashboard provides:

Question Input
      ↓
Ask AI
      ↓
AI Answer

The UI also provides suggested questions.

Example:

Why is this job a good match for me?
Which required skills am I missing?
What should I learn next?
47. API Summary
Method	Endpoint	Purpose
GET	/api/health	Backend health check
POST	/api/resume/upload	Upload and extract PDF
POST	/api/resume/analyze	Analyze resume with Gemini
POST	/api/job/analyze	Analyze job description
POST	/api/jobs/search	Semantic job search
POST	/api/rag/answer	RAG question answering
POST	/api/match	Resume-job matching
POST	/api/chat	AI career chat
48. API Architecture
React
 |
 +---- /api/resume/upload
 |
 +---- /api/resume/analyze
 |
 +---- /api/job/analyze
 |
 +---- /api/jobs/search
 |
 +---- /api/match
 |
 +---- /api/rag/answer
 |
 +---- /api/chat
 |
 ↓
FastAPI
49. Error Handling

The application validates user inputs.

Examples:

Empty Resume
400 Bad Request
Empty Question
400 Bad Request
Invalid Top-K
400 Bad Request
Missing File
400 Bad Request
Unsupported File Type

The system rejects unsupported file formats.

Example:

TXT
DOCX

when PDF is expected.

50. Gemini Retry Handling

Gemini requests can occasionally fail due to temporary service issues.

The project uses retry logic for Gemini operations.

The general approach is:

Attempt 1
   ↓
Failure
   ↓
Wait
   ↓
Attempt 2
   ↓
Failure
   ↓
Wait
   ↓
Attempt 3

This helps handle temporary failures such as transient server errors.

51. Testing Strategy

The project follows happy-path and sad-path testing.

Happy Path

A valid input should produce the expected successful response.

Example:

Valid PDF
   ↓
200
Sad Path

Invalid input should produce a controlled error.

Example:

Missing file
   ↓
400
52. Important Test Cases
UC1
Health endpoint → 200
Unknown endpoint → 404
UC2
Valid PDF → Success
Missing file → Error
TXT → Error
DOCX → Error
Corrupted PDF → Error
Multi-page PDF → Success
UC3
Valid resume → Structured JSON
Empty resume → Validation error
Temporary Gemini failure → Retry
UC4
Valid job description → Structured job
Missing education → null
UC5
Valid text → Embedding
Empty text → Validation error
Vector stored → Searchable
UC6
Java query → Java jobs
Python query → Data Engineering jobs
React query → Frontend jobs
Empty query → 400
Invalid top_k → 400
UC7
Valid RAG request → 200
Empty resume → 400
Empty question → 400
Invalid top_k → 400
UC8
Strong match → High score
Weak match → Low score
Empty resume → 400
Empty job → 400
UC9
Valid career question → 200
Skill-gap question → 200
Empty resume → 400
Empty question → 400
Invalid top_k → 400
53. Git Branching Strategy

The project uses a separate branch for each use case.

main
 |
 dev
 |
 +-- uc1-basic-fastapi
 |
 +-- uc2-pdf-extraction
 |
 +-- uc3-gemini-structured-resume
 |
 +-- uc4-job-description
 |
 +-- uc5-embeddings-vector-db
 |
 +-- uc6-semantic-job-search
 |
 +-- uc7-rag
 |
 +-- uc8-resume-job-matching
 |
 +-- uc9-ai-career-chat
 |
 +-- uc10-react-dashboard