# UC6 — Semantic Job Search

## Objective

Convert a user's search query into an embedding and retrieve the most relevant jobs using vector similarity.

## Flow

```text
User Query
    ↓
Query Embedding
    ↓
ChromaDB
    ↓
Top-K Similar Jobs