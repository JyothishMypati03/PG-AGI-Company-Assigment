from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel

from app.services.embedding_service import generate_embedding
from app.services.vector_service import search_similar_documents
from app.services.pdf_service import extract_text_from_pdf
from app.services.gemini_service import (
    extract_resume_information,
    extract_job_information
)


app = FastAPI(title="AI Resume & Job Assistant")


# ==============================
# Request Models
# ==============================

class ResumeRequest(BaseModel):
    resume_text: str


class JobRequest(BaseModel):
    job_description: str


class JobSearchRequest(BaseModel):
    query: str
    top_k: int = 3


# ==============================
# Health Check - UC1
# ==============================

@app.get("/api/health")
def health_check():
    return {
        "status": "success",
        "message": "Resume AI Backend is running"
    }


# ==============================
# Resume PDF Upload - UC2
# ==============================

@app.post("/api/resume/upload")
async def upload_resume(file: UploadFile = File(...)):

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Resume file is required"
        )

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported"
        )

    file_content = await file.read()

    try:
        extracted_text = extract_text_from_pdf(file_content)

        if not extracted_text:
            raise HTTPException(
                status_code=400,
                detail="No readable text found in the PDF"
            )

        return {
            "status": "success",
            "filename": file.filename,
            "text": extracted_text
        }

    except HTTPException:
        raise

    except Exception as e:

        print("PDF EXTRACTION ERROR:", repr(e))

        raise HTTPException(
            status_code=400,
            detail="Unable to extract text from the PDF"
        )


# ==============================
# Resume Analysis - UC3
# ==============================

@app.post("/api/resume/analyze")
async def analyze_resume(request: ResumeRequest):

    if not request.resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Resume text is required"
        )

    try:

        structured_resume = extract_resume_information(
            request.resume_text
        )

        return {
            "status": "success",
            "data": structured_resume
        }

    except Exception as e:

        print("GEMINI RESUME ERROR:", repr(e))

        raise HTTPException(
            status_code=500,
            detail="Unable to analyze resume"
        )


# ==============================
# Job Description Analysis - UC4
# ==============================

@app.post("/api/job/analyze")
async def analyze_job(request: JobRequest):

    if not request.job_description.strip():
        raise HTTPException(
            status_code=400,
            detail="Job description is required"
        )

    try:

        structured_job = extract_job_information(
            request.job_description
        )

        return {
            "status": "success",
            "data": structured_job
        }

    except Exception as e:

        print("GEMINI JOB ERROR:", repr(e))

        raise HTTPException(
            status_code=500,
            detail="Unable to analyze job description"
        )


# ==============================
# Semantic Job Search - UC5
# ==============================

@app.post("/api/jobs/search")
async def search_jobs(request: JobSearchRequest):

    if not request.query.strip():
        raise HTTPException(
            status_code=400,
            detail="Search query is required"
        )

    if request.top_k < 1:
        raise HTTPException(
            status_code=400,
            detail="top_k must be at least 1"
        )

    try:

        query_embedding = generate_embedding(
            request.query
        )

        results = search_similar_documents(
            query_embedding,
            request.top_k
        )

        search_results = []

        ids = results.get("ids", [[]])[0]
        documents = results.get("documents", [[]])[0]
        metadatas = results.get("metadatas", [[]])[0]
        distances = results.get("distances", [[]])[0]

        for index in range(len(ids)):

            search_results.append({
                "id": ids[index],
                "text": documents[index],
                "metadata": metadatas[index],
                "distance": distances[index]
            })

        return {
            "status": "success",
            "query": request.query,
            "top_k": request.top_k,
            "results": search_results
        }

    except Exception as e:

        print("JOB SEARCH ERROR:", repr(e))

        raise HTTPException(
            status_code=500,
            detail="Unable to search jobs"
        )