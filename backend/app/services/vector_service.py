from pathlib import Path

import chromadb


# Store ChromaDB inside the backend project
BASE_DIR = Path(__file__).resolve().parents[1]
CHROMA_PATH = BASE_DIR / "vector_db" / "chroma"


# Create persistent ChromaDB client
client = chromadb.PersistentClient(
    path=str(CHROMA_PATH)
)


# Create or reuse collection
collection = client.get_or_create_collection(
    name="resume_job_collection"
)


def store_document(
    document_id: str,
    text: str,
    embedding: list[float],
    metadata: dict
):
    """
    Store text, embedding and metadata in ChromaDB.
    """

    if not document_id:
        raise ValueError("Document ID is required")

    if not text.strip():
        raise ValueError("Text is required")

    if not embedding:
        raise ValueError("Embedding is required")

    collection.add(
        ids=[document_id],
        documents=[text],
        embeddings=[embedding],
        metadatas=[metadata]
    )


def search_similar_documents(
    query_embedding: list[float],
    top_k: int = 3
):
    """
    Find documents that are semantically similar
    to the query embedding.
    """

    if not query_embedding:
        raise ValueError("Query embedding is required")

    return collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )