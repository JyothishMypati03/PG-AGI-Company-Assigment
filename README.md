
# UC9 — AI Career Chat

## Objective

Provide an AI-powered career chat interface that answers questions about the candidate's resume, relevant jobs, skill gaps, and career recommendations using RAG.

## Flow

Resume Context + User Question
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
AI Career Answer

## Implemented

- Added AI career chat service.
- Added resume-aware chat.
- Converted user questions into embeddings.
- Retrieved relevant jobs from ChromaDB.
- Combined resume context and retrieved job context.
- Used Gemini to generate career-focused answers.
- Added `POST /api/chat`.
- Added input validation.
- Added Top-K retrieval support.

## Endpoint

```text
POST /api/chat
````

## Example Request

```json
{
  "resume_context": "Java developer with 1 year of experience. Skills: Java, Spring Boot, React, PostgreSQL, SQL, Git and REST APIs. B.Tech in Computer Science.",
  "question": "Why is a Java backend developer job a good match for me?",
  "top_k": 3
}
```

## Example Response

```json
{
  "status": "success",
  "data": {
    "answer": "The job is a good match because your Java, Spring Boot, SQL and REST API skills align with the required backend technologies.",
    "retrieved_context": [
      "Java backend developer...",
      "Java microservices developer..."
    ]
  }
}
```
