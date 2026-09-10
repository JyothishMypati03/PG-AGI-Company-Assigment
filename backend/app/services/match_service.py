from app.schemas.match_schema import MatchResult


def calculate_match(
    resume: dict,
    job: dict
) -> dict:

    # ------------------------------
    # Skills
    # ------------------------------

    resume_skills = set()

    skills = resume.get("skills", {})

    for skill_group in skills.values():

        if isinstance(skill_group, list):
            resume_skills.update(
                skill.lower()
                for skill in skill_group
            )

    required_skills = set(
        skill.lower()
        for skill in job.get("required_skills", [])
    )

    matched_skills = sorted(
        resume_skills.intersection(required_skills)
    )

    missing_skills = sorted(
        required_skills.difference(resume_skills)
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

    experience_match = True

    job_experience = job.get(
        "experience_required"
    )

    if not job_experience:
        experience_match = True

    experience_score = (
        100 if experience_match else 0
    )

    # ------------------------------
    # Education
    # ------------------------------

    education_score = 100

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

    result = MatchResult(
        match_score=final_score,
        matched_skills=matched_skills,
        missing_skills=missing_skills,
        experience_match=experience_match,
        recommendation=recommendation
    )

    return result.model_dump()