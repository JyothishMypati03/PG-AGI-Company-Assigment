from fastapi import FastAPI, File, UploadFile, HTTPException

from app.services.pdf_service import extract_text_from_pdf


app = FastAPI(title="AI Resume & Job Assistant")


@app.get("/api/health")
def health_check():
    return {
        "status": "success",
        "message": "Resume AI Backend is running"
    }


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

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to extract text from the PDF"
        )