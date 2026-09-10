# UC5 — Embeddings & Vector Database

## Objective

Convert resume/job text into embeddings and store them in ChromaDB for semantic search.

## Flow

```text
Text
 ↓
Embedding Model
 ↓
Vector
 ↓
ChromaDB
 ↓
Similarity Search
```

## Implemented

* Generated embeddings using `all-MiniLM-L6-v2`
* Stored text, embeddings, IDs, and metadata in ChromaDB
* Implemented semantic similarity search
* Added FastAPI endpoint:

```text
POST /api/jobs/search
```

### Example Request

```json
{
  "query": "Java Spring Boot backend engineer",
  "top_k": 3
}
```

### Result

Returns the most semantically similar job documents with their metadata and similarity distance.

## Tests

* Valid semantic search → 200 ✅
* Unrelated search → tested ✅
* Empty query → 400
* Invalid `top_k` → 400

## Key Learning

> Embeddings help find semantically similar information, while ChromaDB stores and retrieves the vectors efficiently.

**Next:** UC6 — Semantic Job Search
