from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel

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