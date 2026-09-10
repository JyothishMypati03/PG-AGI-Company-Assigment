from app.services.embedding_service import generate_embedding
from app.services.vector_service import search_similar_documents
from app.services.gemini_service import generate_rag_answer


def generate_rag_response(
    resume_context: str,
    question: str,
    top_k: int = 3
) -> dict:

    if not resume_context.strip():
        raise ValueError("Resume context is required")

    if not question.strip():
        raise ValueError("Question is required")

    if top_k < 1:
        raise ValueError("top_k must be at least 1")

    # Step 1: Convert the question into an embedding
    query_embedding = generate_embedding(question)

    # Step 2: Retrieve similar jobs from ChromaDB
    results = search_similar_documents(
        query_embedding,
        top_k
    )

    # Step 3: Extract retrieved job documents
    documents = results.get("documents", [[]])[0]

    # Step 4: Build job context
    job_context = "\n\n".join(documents)

    # Step 5: Send resume + retrieved jobs + question to Gemini
    answer = generate_rag_answer(
        resume_context=resume_context,
        job_context=job_context,
        question=question
    )

    return {
        "answer": answer,
        "retrieved_jobs": documents
    }