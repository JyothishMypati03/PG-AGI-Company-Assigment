# UC2 – Resume Upload and PDF Extraction

## Overview

UC2 extends the FastAPI backend to accept a resume PDF, validate the uploaded file, extract readable text from the PDF, and return the extracted resume text.

The purpose of this use case is to create a reliable boundary between the uploaded resume and the later AI processing.

```text
                    UC2 – RESUME PDF PROCESSING

                         Resume.pdf
                              |
                              v
                    +-------------------+
                    |  FastAPI Backend  |
                    +---------+---------+
                              |
                              v
                    +-------------------+
                    |  File Validation  |
                    +---------+---------+
                              |
                              v
                    +-------------------+
                    |   PDF Extraction  |
                    |      (pypdf)      |
                    +---------+---------+
                              |
                              v
                    +-------------------+
                    |    Resume Text    |
                    +-------------------+
```

## Objective

The main objectives of UC2 are:

* Accept a resume PDF through FastAPI.
* Validate the uploaded file.
* Allow only PDF files.
* Extract readable text from the PDF.
* Handle invalid and corrupted files safely.
* Test the API independently using Swagger.
* Keep the backend ready for the next AI-based use case.

## Technology Used

```text
Python
FastAPI
Uvicorn
pypdf
Swagger UI
Git
```

## API

```text
POST /api/resume/upload
```

The API accepts a resume PDF and returns the extracted text.

```text
                    Client
                      |
                      | Upload Resume.pdf
                      v
              POST /api/resume/upload
                      |
                      v
                 FastAPI
                      |
                      v
               File Validation
                      |
             +--------+--------+
             |                 |
           Valid             Invalid
             |                 |
             v                 v
       PDF Extraction       Error Response
             |
             v
        Resume Text
```

## Successful Response

```json
{
    "status": "success",
    "filename": "Resume.pdf",
    "text": "Extracted resume text..."
}
```

## Project Structure

```text
backend/
├── app/
│   ├── main.py
│   └── services/
│       ├── __init__.py
│       └── pdf_service.py
├── tests/
├── .venv/
├── .gitignore
└── requirements.txt
```

## PDF Extraction Flow

```text
Resume.pdf
    |
    v
Upload File
    |
    v
Validate File
    |
    v
Check PDF Type
    |
    v
Read PDF
    |
    v
Read Each Page
    |
    v
Extract Text
    |
    v
Combine Text
    |
    v
Return Resume Text
```

## Validation

The uploaded file is checked before extraction.

```text
                  Uploaded File
                       |
                       v
                Is File Present?
                   /       \
                 Yes        No
                  |          |
                  v          v
             Is it PDF?   Validation
               /    \       Error
             Yes     No
              |       |
              v       v
        Extract     400 Error
          Text
```

Only PDF files are accepted.

TXT, DOCX, and other unsupported file types are rejected.

## Testing

### TC 2.1 – Valid PDF

```text
Input:
Valid Resume.pdf

Expected:
Readable resume text is returned.
```

```text
Resume.pdf
    |
    v
Validation
    |
    v
PDF Extraction
    |
    v
Resume Text
    |
    v
200 OK
```

### TC 2.2 – Missing File

```text
Input:
No file

Expected:
Controlled validation error.
```

```text
No File
   |
   v
Validation
   |
   v
Error Response
```

### TC 2.3 – Unsupported File

```text
Input:
TXT / DOCX

Expected:
Unsupported file type error.
```

```text
TXT / DOCX
     |
     v
File Validation
     |
     v
Not a PDF
     |
     v
400 Bad Request
```

### TC 2.4 – Corrupted PDF

```text
Input:
Corrupted PDF

Expected:
Controlled extraction error.
```

```text
Corrupted PDF
      |
      v
PDF Reader
      |
      v
Extraction Error
      |
      v
Controlled Error Response
```

### TC 2.5 – Multi-page PDF

```text
Input:
Multi-page Resume.pdf

Expected:
Readable text from all readable pages is returned.
```

```text
             Resume.pdf
                  |
        +---------+---------+
        |         |         |
        v         v         v
      Page 1    Page 2    Page 3
        |         |         |
        v         v         v
       Text      Text      Text
        |         |         |
        +---------+---------+
                  |
                  v
          Combined Resume Text
```

## API Testing

Swagger UI is used to test the upload API independently before connecting the React frontend.

```text
http://127.0.0.1:8000/docs
```

Swagger testing flow:

```text
Open Swagger
     |
     v
POST /api/resume/upload
     |
     v
Try it out
     |
     v
Choose Resume.pdf
     |
     v
Execute
     |
     v
View Response
```

## Important Limitation

PDF extraction is not the same as document understanding.

A resume may contain multiple columns, tables, icons, images, and unusual formatting.

Because of the way PDF documents store text and layout information, the extracted text may sometimes appear in a different order from the visual document.

This limitation is accepted in UC2 because the main purpose of this use case is to learn reliable file handling and PDF text extraction.

More advanced document parsing can be introduced later if required.

## Result

```text
                  UC2 RESULT

                 Resume.pdf
                     |
                     v
              FastAPI Upload
                     |
                     v
              File Validation
                     |
                     v
              PDF Extraction
                     |
                     v
               Resume Text
                     |
                     v
               API Testing
                     |
                     v
                UC2 Complete
```

## Git

UC2 is developed in a separate branch:

```text
uc2-pdf-extraction
```

Example commit:

```text
feat: implement UC2 resume PDF extraction
```

## Next Use Case

```text
UC3 – Resume Text to Structured Data
```

UC3 will use the extracted resume text and introduce Gemini to convert the unstructured text into structured information such as skills, education, experience, and other relevant resume details.
