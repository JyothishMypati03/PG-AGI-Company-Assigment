import re

from app.schemas.match_schema import MatchResult


SKILL_ALIASES = {
    "postgresql": "sql",
    "mysql": "sql",
    "mariadb": "sql",
    "rest api": "rest",
    "rest apis": "rest",
    "spring": "spring boot",
}


def normalize_skill(skill: str) -> str:
    skill = skill.strip().lower()

    return SKILL_ALIASES.get(
        skill,
        skill
    )


def extract_years(text: str) -> float:
    if not text:
        return 0

    text = text.lower()

    range_match = re.search(
        r"(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*years?",
        text
    )

    if range_match:
        return float(
            range_match.group(1)
        )

    years_match = re.search(
        r"(\d+(?:\.\d+)?)\s*\+?\s*years?",
        text
    )

    if years_match:
        return float(
            years_match.group(1)
        )

    return 0


def calculate_experience_match(
    resume: dict,
    job: dict
) -> bool:

    required_experience = job.get(
        "experience_required"
    )

    if not required_experience:
        return True

    required_years = extract_years(
        required_experience
    )

    experiences = resume.get(
        "experience",
        []
    )

    total_experience = 0

    for experience in experiences:

        duration = experience.get(
            "duration",
            ""
        )

        total_experience += extract_years(
            duration
        )

    return total_experience >= required_years


def calculate_education_match(
    resume: dict,
    job: dict
) -> bool:

    required_education = job.get(
        "education_required"
    )

    if not required_education:
        return True

    resume_education = resume.get(
        "education",
        []
    )

    if not resume_education:
        return False

    required = required_education.lower()

    for education in resume_education:

        education_text = education.lower()

        if (
            (
                "bachelor" in required
                or "b.tech" in required
                or "b.e" in required
            )
            and
            (
                "bachelor" in education_text
                or "b.tech" in education_text
                or "b.e" in education_text
            )
        ):
            return True

        if (
            (
                "master" in required
                or "m.tech" in required
                or "m.e" in required
            )
            and
            (
                "master" in education_text
                or "m.tech" in education_text
                or "m.e" in education_text
            )
        ):
            return True

        if (
            "computer science" in required
            and "computer science" in education_text
        ):
            return True

    return False


def calculate_match(
    resume: dict,
    job: dict
) -> dict:

    # ------------------------------
    # Resume Skills
    # ------------------------------

    resume_skills = set()

    skills = resume.get(
        "skills",
        {}
    )

    for skill_group in skills.values():

        if isinstance(skill_group, list):

            for skill in skill_group:

                resume_skills.add(
                    normalize_skill(skill)
                )

    # ------------------------------
    # Required Job Skills
    # ------------------------------

    required_skills = set()

    for skill in job.get(
        "required_skills",
        []
    ):

        required_skills.add(
            normalize_skill(skill)
        )

    # ------------------------------
    # Matched Skills
    # ------------------------------

    matched_skills = sorted(
        resume_skills.intersection(
            required_skills
        )
    )

    # ------------------------------
    # Missing Skills
    # ------------------------------

    missing_skills = sorted(
        required_skills.difference(
            resume_skills
        )
    )

    # ------------------------------
    # Skill Score
    # ------------------------------

    if required_skills:

        skill_score = (
            len(matched_skills)
            / len(required_skills)
        ) * 100

    else:

        skill_score = 100

    # ------------------------------
    # Experience
    # ------------------------------

    experience_match = calculate_experience_match(
        resume,
        job
    )

    experience_score = (
        100
        if experience_match
        else 0
    )

    # ------------------------------
    # Education
    # ------------------------------

    education_match = calculate_education_match(
        resume,
        job
    )

    education_score = (
        100
        if education_match
        else 0
    )

    # ------------------------------
    # Final Score
    # ------------------------------

    final_score = (
        skill_score * 0.60
        + experience_score * 0.25
        + education_score * 0.15
    )

    final_score = round(
        final_score,
        2
    )

    # ------------------------------
    # Recommendation
    # ------------------------------

    if final_score >= 80:

        recommendation = "Good match"

    elif final_score >= 60:

        recommendation = "Moderate match"

    else:

        recommendation = "Low match"

    # ------------------------------
    # Final Result
    # ------------------------------

    result = MatchResult(
        match_score=final_score,
        skill_score=round(skill_score, 2),
        experience_score=experience_score,
        education_score=education_score,
        matched_skills=matched_skills,
        missing_skills=missing_skills,
        experience_match=experience_match,
        education_match=education_match,
        recommendation=recommendation
    )

    return result.model_dump()