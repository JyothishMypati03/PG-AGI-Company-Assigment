# UC1 – Basic FastAPI Backend

## Overview

The first use case establishes the basic backend foundation for the AI Resume & Job Matching System.

Python, FastAPI, and Uvicorn are used to create and run a simple backend application.

The main purpose of this use case is to verify that the backend can start successfully, handle an HTTP request, and return a JSON response.

AI features such as Gemini, PDF processing, embeddings, vector databases, RAG, and job matching are not included in UC1.

## What Was Implemented

A Python virtual environment was created to isolate the project dependencies.

FastAPI was used to create the backend application.

Uvicorn was used to run the FastAPI application.

A simple Health Check API was created.

API:

GET /api/health

The Health Check API verifies whether the backend is running successfully.

## Visual Flow

```text
                    UC1 – BASIC FASTAPI BACKEND

                              Client
                                |
                                | HTTP Request
                                v
                    +-----------------------+
                    |    FastAPI Backend    |
                    |                       |
                    |      /api/health      |
                    +-----------+-----------+
                                |
                                v
                    +-----------------------+
                    |     Health Check      |
                    |                       |
                    |    Backend Status     |
                    +-----------+-----------+
                                |
                                | JSON Response
                                v
                    +-----------------------+
                    |        Client         |
                    |                       |
                    |  "Backend is Running" |
                    +-----------------------+
```

## API Details

Endpoint:

```text
GET /api/health
```

URL:

```text
http://127.0.0.1:8000/api/health
```

Expected Response:

```json
{
    "status": "success",
    "message": "Resume AI Backend is running"
}
```

Expected Status:

```text
200 OK
```

## Development Flow

```text
        Python
           |
           v
   Virtual Environment
           |
           v
        FastAPI
           |
           v
        Uvicorn
           |
           v
   Health Check API
           |
           v
        Testing
           |
           v
      UC1 Complete
           |
           v
   UC2 – PDF Processing
```

## API Testing

Swagger UI was used to test the API.

Swagger URL:

```text
http://127.0.0.1:8000/docs
```

The API was tested with both valid and invalid requests.

### Happy Test

```text
/api/health
     |
     v
  200 OK
```

The valid request returns the expected success response.

### Sad Test

```text
/api/hello
     |
     v
404 Not Found
```

The invalid request returns `404 Not Found`, while the backend continues running normally.

## Project Structure

```text
backend/
├── app/
│   └── main.py
├── tests/
├── .venv/
├── .gitignore
└── requirements.txt
```

## Dependencies

The main dependencies used in UC1 are:

```text
FastAPI
Uvicorn
```

The installed dependencies are recorded in:

```text
requirements.txt
```

## Git

A dedicated Git branch was created for UC1.

```text
uc1-basic-backend
```

The implementation and testing changes were committed to Git.

## Result

```text
                  UC1 RESULT

                 Python
                    |
                    v
             FastAPI Backend
                    |
                    v
             Health Check API
                    |
                    v
              API Testing
              /          \
             /            \
            v              v
        200 OK          404 Not Found
        Success         Invalid Route
            \              /
             \            /
              v          v
             Backend Verified
                    |
                    v
              UC1 Completed
```

The basic FastAPI backend has been successfully created, started, and tested.

## Next Use Case

```text
UC2 – Resume PDF Upload and Text Extraction
```

UC2 will extend the backend by adding resume PDF upload and text extraction functionality.
