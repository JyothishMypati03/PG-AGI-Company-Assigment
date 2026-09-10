# UC8 — Resume and Job Matching

## Objective

Compare a structured resume with a selected job and generate a transparent match indicator.

## Flow

Resume + Job
→ Skill Matching
→ Experience Matching
→ Education Matching
→ Final Score
→ Recommendation

## Implemented

- Matched required skills.
- Identified missing skills.
- Added skill aliases such as PostgreSQL → SQL.
- Compared candidate and required experience.
- Compared education requirements.
- Calculated a deterministic match score.
- Added `POST /api/match`.
- Added match recommendation.

## Score

```text
Skill       → 60%
Experience  → 25%
Education   → 15%