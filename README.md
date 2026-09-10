
# UC7 — RAG Pipeline

## Objective
Retrieve relevant jobs from ChromaDB and use Gemini to generate answers using resume and job context.

## Flow

Question → Embedding → ChromaDB → Top-K Jobs → Context → Gemini → Answer

## Implemented

- Added RAG service.
- Integrated ChromaDB retrieval with Gemini.
- Added `POST /api/rag/answer`.
- Added input validation.

## Example Request

```json
{
  "resume_context": "Java developer with Spring Boot and PostgreSQL.",
  "question": "How well does this job match my skills?",
  "top_k": 3
}
````

## Tests

* Valid request → 200
* Empty resume → 400
* Empty question → 400
* Invalid `top_k` → 400

## Key Learning

RAG = Retrieval + Context + Generation

## Git

Branch: `uc7-rag`

Commit: `feat: implement UC7 rag pipeline`

## Next

UC8 — Resume and Job Matching
