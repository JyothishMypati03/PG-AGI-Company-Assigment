import json
import os
import time

from dotenv import load_dotenv
from google import genai
from google.genai import types

from app.schemas.resume_schema import ResumeSchema


load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY is not configured")


client = genai.Client(api_key=api_key)


RESUME_PROMPT = """
Extract only information supported by the resume.
Do not invent missing information.

Return personal information, education, skills, experience and projects.

Return the result as valid JSON.

Resume:
{resume_text}
"""


def extract_resume_information(resume_text: str) -> dict:

    prompt = RESUME_PROMPT.format(
        resume_text=resume_text
    )

    for attempt in range(3):

        try:
            response = client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=ResumeSchema
                )
            )

            resume_data = json.loads(response.text)

            validated_resume = ResumeSchema.model_validate(
                resume_data
            )

            return validated_resume.model_dump()

        except Exception as e:

            print(
                f"GEMINI ATTEMPT {attempt + 1} FAILED:",
                repr(e)
            )

            if attempt < 2:
                time.sleep(2 * (attempt + 1))
            else:
                raise