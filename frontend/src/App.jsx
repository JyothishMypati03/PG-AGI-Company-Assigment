import { useState } from "react";
import "./App.css";

function App() {
  // ==========================================
  // Resume State
  // ==========================================

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // Job Search State
  // ==========================================

  const [jobQuery, setJobQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [jobLoading, setJobLoading] = useState(false);
  const [jobError, setJobError] = useState("");

  // ==========================================
  // Job Match State
  // ==========================================

  const [selectedJob, setSelectedJob] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchError, setMatchError] = useState("");

  // ==========================================
  // AI Career Chat State - UC10.8
  // ==========================================

  const [chatQuestion, setChatQuestion] = useState("");
  const [chatAnswer, setChatAnswer] = useState("");
  const [chatContext, setChatContext] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");

  // ==========================================
  // Resume File Selection
  // ==========================================

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setError("");
    setResumeText("");
    setResumeData(null);

    setJobs([]);
    setJobQuery("");
    setJobError("");

    setSelectedJob(null);
    setMatchResult(null);
    setMatchError("");

    setChatQuestion("");
    setChatAnswer("");
    setChatContext([]);
    setChatError("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setSelectedFile(null);
      setError("Please select a PDF file.");
      return;
    }

    setSelectedFile(file);
  };

  // ==========================================
  // Resume Analysis
  // ==========================================

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select a resume PDF.");
      return;
    }

    setLoading(true);
    setError("");
    setResumeText("");
    setResumeData(null);

    setMatchResult(null);
    setMatchError("");

    setChatQuestion("");
    setChatAnswer("");
    setChatContext([]);
    setChatError("");

    try {
      // ==========================================
      // Step 1: Upload PDF
      // ==========================================

      const formData = new FormData();

      formData.append("file", selectedFile);

      const uploadResponse = await fetch(
        "http://127.0.0.1:8000/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(
          uploadData.detail ||
            "Unable to upload resume."
        );
      }

      const extractedText = uploadData.text || "";

      if (!extractedText.trim()) {
        throw new Error(
          "No readable text found in the resume."
        );
      }

      setResumeText(extractedText);

      // ==========================================
      // Step 2: Analyze Resume with Gemini
      // ==========================================

      const analyzeResponse = await fetch(
        "http://127.0.0.1:8000/api/resume/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resume_text: extractedText,
          }),
        }
      );

      const analyzeData =
        await analyzeResponse.json();

      if (!analyzeResponse.ok) {
        throw new Error(
          analyzeData.detail ||
            "Unable to analyze resume."
        );
      }

      // ==========================================
      // Step 3: Store Structured Resume
      // ==========================================

      setResumeData(analyzeData.data);

    } catch (error) {
      console.error(
        "Resume analysis error:",
        error
      );

      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Job Search
  // ==========================================

  const handleJobSearch = async () => {
    if (!jobQuery.trim()) {
      setJobError(
        "Please enter a job search query."
      );
      return;
    }

    setJobLoading(true);
    setJobError("");
    setJobs([]);

    setSelectedJob(null);
    setMatchResult(null);
    setMatchError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/jobs/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: jobQuery,
            top_k: 3,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Unable to search jobs."
        );
      }

      setJobs(data.results || []);

    } catch (error) {
      console.error(
        "Job search error:",
        error
      );

      setJobError(error.message);

    } finally {
      setJobLoading(false);
    }
  };

  // ==========================================
  // Job Matching - UC10.6
  // ==========================================

  const handleJobMatch = async (job) => {
    if (!resumeData) {
      setMatchError(
        "Please analyze your resume before matching with a job."
      );
      return;
    }

    setSelectedJob(job);
    setMatchResult(null);
    setMatchError("");
    setMatchLoading(true);

    try {
      // ==========================================
      // Step 1: Analyze Job Description
      // ==========================================

      const jobAnalyzeResponse = await fetch(
        "http://127.0.0.1:8000/api/job/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_description: job.text,
          }),
        }
      );

      const jobAnalyzeData =
        await jobAnalyzeResponse.json();

      if (!jobAnalyzeResponse.ok) {
        throw new Error(
          jobAnalyzeData.detail ||
            "Unable to analyze job."
        );
      }

      const structuredJob =
        jobAnalyzeData.data;

      // ==========================================
      // Step 2: Match Resume With Job
      // ==========================================

      const matchResponse = await fetch(
        "http://127.0.0.1:8000/api/match",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resume: resumeData,
            job: structuredJob,
          }),
        }
      );

      const matchData =
        await matchResponse.json();

      if (!matchResponse.ok) {
        throw new Error(
          matchData.detail ||
            "Unable to calculate job match."
        );
      }

      // ==========================================
      // Step 3: Store Match Result
      // ==========================================

      setMatchResult(matchData.data);

    } catch (error) {
      console.error(
        "Job matching error:",
        error
      );

      setMatchError(error.message);

    } finally {
      setMatchLoading(false);
    }
  };

  // ==========================================
  // AI Career Chat - UC10.8
  // ==========================================

  const handleChat = async () => {
    if (!resumeData) {
      setChatError(
        "Please analyze your resume before using AI Career Chat."
      );
      return;
    }

    if (!chatQuestion.trim()) {
      setChatError(
        "Please enter a question."
      );
      return;
    }

    setChatLoading(true);
    setChatError("");
    setChatAnswer("");
    setChatContext([]);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resume_context: resumeText,
            question: chatQuestion,
            top_k: 3,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Unable to generate AI response."
        );
      }

      setChatAnswer(
        data.data?.answer || ""
      );

      setChatContext(
        data.data?.retrieved_context || []
      );

    } catch (error) {
      console.error(
        "AI chat error:",
        error
      );

      setChatError(error.message);

    } finally {
      setChatLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="app">

      <main className="upload-container">

        <section className="upload-card">

          {/* ==========================================
              Header
          ========================================== */}

          <div className="icon">
            📄
          </div>

          <h1>
            AI Resume & Job Assistant
          </h1>

          <p className="subtitle">
            Upload your resume and discover relevant
            jobs, skill gaps, and AI-powered career
            insights.
          </p>


          {/* ==========================================
              Resume Upload
          ========================================== */}

          <label className="upload-box">

            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />

            <div className="upload-icon">
              ↑
            </div>

            <h2>
              {selectedFile
                ? selectedFile.name
                : "Upload your resume"}
            </h2>

            <p>
              {selectedFile
                ? "PDF selected successfully"
                : "Click to choose a PDF file"}
            </p>

          </label>


          {/* ==========================================
              Resume Error
          ========================================== */}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}


          {/* ==========================================
              Analyze Resume Button
          ========================================== */}

          <button
            className="analyze-button"
            onClick={handleAnalyze}
            disabled={
              !selectedFile ||
              loading
            }
          >
            {loading
              ? "Analyzing Resume..."
              : "Analyze Resume"}
          </button>

          <p className="file-info">
            Supported format: PDF
          </p>


          {/* ==========================================
              Extracted Resume Text
          ========================================== */}

          {resumeText && (
            <div className="resume-result">

              <h2>
                Extracted Resume Text
              </h2>

              <pre>
                {resumeText}
              </pre>

            </div>
          )}


          {/* ==========================================
              Resume Dashboard
          ========================================== */}

          {resumeData && (
            <div className="resume-dashboard">

              <h2 className="dashboard-title">
                Resume Dashboard
              </h2>


              {/* ==========================================
                  Personal Information
              ========================================== */}

              <div className="dashboard-section">

                <h3>
                  Personal Information
                </h3>

                <div className="personal-info">

                  <h4>
                    {resumeData
                      .personal_information
                      ?.full_name ||
                      "Name not available"}
                  </h4>

                  <p>
                    {resumeData
                      .personal_information
                      ?.title ||
                      "Title not available"}
                  </p>

                  {resumeData
                    .personal_information
                    ?.email && (
                    <p>
                      📧{" "}
                      {
                        resumeData
                          .personal_information
                          .email
                      }
                    </p>
                  )}

                  {resumeData
                    .personal_information
                    ?.phone && (
                    <p>
                      📱{" "}
                      {
                        resumeData
                          .personal_information
                          .phone
                      }
                    </p>
                  )}

                  {resumeData
                    .personal_information
                    ?.linkedin && (
                    <p>
                      🔗{" "}
                      {
                        resumeData
                          .personal_information
                          .linkedin
                      }
                    </p>
                  )}

                  {resumeData
                    .personal_information
                    ?.github && (
                    <p>
                      💻{" "}
                      {
                        resumeData
                          .personal_information
                          .github
                      }
                    </p>
                  )}

                  {resumeData
                    .personal_information
                    ?.website && (
                    <p>
                      🌐{" "}
                      {
                        resumeData
                          .personal_information
                          .website
                      }
                    </p>
                  )}

                </div>

              </div>


              {/* ==========================================
                  Skills
              ========================================== */}

              <div className="dashboard-section">

                <h3>
                  Skills
                </h3>

                <div className="skill-groups">

                  <SkillGroup
                    title="Languages"
                    skills={
                      resumeData
                        .skills
                        ?.languages
                    }
                  />

                  <SkillGroup
                    title="Frontend"
                    skills={
                      resumeData
                        .skills
                        ?.frontend
                    }
                  />

                  <SkillGroup
                    title="Backend"
                    skills={
                      resumeData
                        .skills
                        ?.backend
                    }
                  />

                  <SkillGroup
                    title="Databases"
                    skills={
                      resumeData
                        .skills
                        ?.databases
                    }
                  />

                  <SkillGroup
                    title="Tools"
                    skills={
                      resumeData
                        .skills
                        ?.tools
                    }
                  />

                  <SkillGroup
                    title="Cloud"
                    skills={
                      resumeData
                        .skills
                        ?.cloud
                    }
                  />

                  <SkillGroup
                    title="Data Engineering"
                    skills={
                      resumeData
                        .skills
                        ?.data_engineering
                    }
                  />

                </div>

              </div>


              {/* ==========================================
                  Education
              ========================================== */}

              <div className="dashboard-section">

                <h3>
                  Education
                </h3>

                {resumeData.education?.length > 0 ? (

                  <ul>
                    {resumeData.education.map(
                      (education, index) => (
                        <li key={index}>
                          {education}
                        </li>
                      )
                    )}
                  </ul>

                ) : (

                  <p className="empty-text">
                    No education information found.
                  </p>

                )}

              </div>


              {/* ==========================================
                  Experience
              ========================================== */}

              <div className="dashboard-section">

                <h3>
                  Experience
                </h3>

                {resumeData.experience?.length > 0 ? (

                  resumeData.experience.map(
                    (experience, index) => (

                      <div
                        className="experience-card"
                        key={index}
                      >

                        <h4>
                          {experience.title ||
                            "Experience"}
                        </h4>

                        <p className="company">
                          {experience.company ||
                            ""}
                        </p>

                        <p className="duration">
                          {experience.duration ||
                            ""}
                        </p>

                        <p>
                          {experience.description ||
                            ""}
                        </p>

                      </div>

                    )
                  )

                ) : (

                  <p className="empty-text">
                    No experience information found.
                  </p>

                )}

              </div>


              {/* ==========================================
                  Projects
              ========================================== */}

              <div className="dashboard-section">

                <h3>
                  Projects
                </h3>

                {resumeData.projects?.length > 0 ? (

                  resumeData.projects.map(
                    (project, index) => (

                      <div
                        className="project-card"
                        key={index}
                      >

                        <h4>
                          {project.name ||
                            "Project"}
                        </h4>

                        <p>
                          {project.description ||
                            ""}
                        </p>

                        {project
                          .technologies
                          ?.length > 0 && (

                          <div className="technology-list">

                            {project.technologies.map(
                              (
                                technology,
                                techIndex
                              ) => (

                                <span
                                  className="technology"
                                  key={techIndex}
                                >
                                  {technology}
                                </span>

                              )
                            )}

                          </div>

                        )}

                      </div>

                    )
                  )

                ) : (

                  <p className="empty-text">
                    No projects found.
                  </p>

                )}

              </div>

            </div>
          )}


          {/* ==========================================
              Job Search - UC10.5
          ========================================== */}

          <div className="job-search">

            <h2 className="dashboard-title">
              Job Search
            </h2>

            <p className="job-search-description">
              Search for jobs using natural language.
              The system will retrieve the most relevant
              jobs using semantic search.
            </p>


            {/* Search Box */}

            <div className="job-search-box">

              <input
                type="text"
                value={jobQuery}
                onChange={(event) =>
                  setJobQuery(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {

                  if (
                    event.key === "Enter"
                  ) {
                    handleJobSearch();
                  }

                }}
                placeholder="Java backend developer with Spring Boot"
              />

              <button
                onClick={handleJobSearch}
                disabled={jobLoading}
              >
                {jobLoading
                  ? "Searching..."
                  : "Search Jobs"}
              </button>

            </div>


            {/* Search Error */}

            {jobError && (
              <p className="error-message">
                {jobError}
              </p>
            )}


            {/* Job Results */}

            {jobs.length > 0 && (

              <div className="job-results">

                <h3>
                  Relevant Jobs
                </h3>

                {jobs.map(
                  (job, index) => (

                    <div
                      className="job-card"
                      key={
                        job.id || index
                      }
                    >

                      <div className="job-card-header">

                        <div>

                          <h4>
                            {
                              job.metadata
                                ?.job_title ||
                              "Job Opportunity"
                            }
                          </h4>

                          <p className="job-company">
                            {
                              job.metadata
                                ?.company ||
                              "Company not available"
                            }
                          </p>

                        </div>

                        <span className="job-distance">

                          Distance:{" "}

                          {
                            typeof job.distance ===
                            "number"
                              ? job.distance.toFixed(
                                  3
                                )
                              : "N/A"
                          }

                        </span>

                      </div>


                      <p className="job-description">
                        {job.text}
                      </p>


                      {/* Match Button */}

                      <button
                        className="match-button"
                        onClick={() =>
                          handleJobMatch(
                            job
                          )
                        }
                        disabled={
                          matchLoading
                        }
                      >

                        {matchLoading &&
                        selectedJob?.id ===
                          job.id
                          ? "Analyzing Match..."
                          : "Check Match"}

                      </button>

                    </div>

                  )
                )}

              </div>

            )}

          </div>


          {/* ==========================================
              Match Error
          ========================================== */}

          {matchError && (
            <p className="error-message">
              {matchError}
            </p>
          )}


          {/* ==========================================
              Job Match Result - UC10.6
          ========================================== */}

          {matchResult && (

            <div className="match-result">

              <h2 className="dashboard-title">
                Job Match
              </h2>


              {/* Selected Job */}

              {selectedJob && (

                <div className="selected-job-card">

                  <h3>
                    {
                      selectedJob.metadata
                        ?.job_title ||
                      "Selected Job"
                    }
                  </h3>

                  <p>
                    {
                      selectedJob.metadata
                        ?.company ||
                      "Company not available"
                    }
                  </p>

                </div>

              )}


              {/* Match Score */}

              <div className="match-score-card">

                <p>
                  Match Score
                </p>

                <h2>
                  {matchResult.match_score}%
                </h2>

                <span>
                  {matchResult.recommendation}
                </span>

              </div>


              {/* Match Breakdown */}

              <div className="match-section">

                <h3>
                  Match Breakdown
                </h3>

                <div className="score-row">

                  <span>
                    Skills
                  </span>

                  <strong>
                    {matchResult.skill_score}%
                  </strong>

                </div>

                <div className="score-row">

                  <span>
                    Experience
                  </span>

                  <strong>
                    {matchResult.experience_score}%
                  </strong>

                </div>

                <div className="score-row">

                  <span>
                    Education
                  </span>

                  <strong>
                    {matchResult.education_score}%
                  </strong>

                </div>

              </div>


              {/* Matched Skills */}

              <div className="match-section">

                <h3>
                  Matched Skills
                </h3>

                <div className="skill-list">

                  {matchResult
                    .matched_skills
                    ?.length > 0 ? (

                    matchResult.matched_skills.map(
                      (skill, index) => (

                        <span
                          className="skill"
                          key={index}
                        >
                          {skill}
                        </span>

                      )
                    )

                  ) : (

                    <p className="empty-text">
                      No matched skills found.
                    </p>

                  )}

                </div>

              </div>


              {/* Missing Skills */}

              <div className="match-section">

                <h3>
                  Missing Skills
                </h3>

                <div className="skill-list">

                  {matchResult
                    .missing_skills
                    ?.length > 0 ? (

                    matchResult.missing_skills.map(
                      (skill, index) => (

                        <span
                          className="missing-skill"
                          key={index}
                        >
                          {skill}
                        </span>

                      )
                    )

                  ) : (

                    <p className="empty-text">
                      No missing required skills.
                    </p>

                  )}

                </div>

              </div>


              {/* Experience Match */}

              <div className="match-section">

                <h3>
                  Experience
                </h3>

                <p>
                  {matchResult
                    .experience_match
                    ? "✓ Experience requirement satisfied"
                    : "✗ Experience requirement not satisfied"}
                </p>

              </div>


              {/* Education Match */}

              <div className="match-section">

                <h3>
                  Education
                </h3>

                <p>
                  {matchResult
                    .education_match
                    ? "✓ Education requirement satisfied"
                    : "✗ Education requirement not satisfied"}
                </p>

              </div>


              {/* ==========================================
                  UC10.7 - Skill Gap
              ========================================== */}

              <div className="skill-gap">

                <h2 className="dashboard-title">
                  Skill Gap
                </h2>

                <p className="skill-gap-description">
                  These are the skills required by the
                  selected job that are not currently
                  detected in your resume.
                </p>


                {matchResult.missing_skills &&
                matchResult.missing_skills.length > 0 ? (

                  <div className="skill-gap-list">

                    {matchResult.missing_skills.map(
                      (skill, index) => (

                        <div
                          className="skill-gap-card"
                          key={index}
                        >

                          <div className="skill-gap-icon">
                            📚
                          </div>

                          <div>

                            <h4>
                              {skill}
                            </h4>

                            <p>
                              This skill is required
                              for the selected job.
                              Consider learning and
                              practicing it to improve
                              your match.
                            </p>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <div className="skill-gap-success">

                    <div className="skill-gap-success-icon">
                      🎉
                    </div>

                    <div>

                      <h4>
                        No major skill gaps detected
                      </h4>

                      <p>
                        Your resume contains all the
                        required skills identified for
                        this job.
                      </p>

                    </div>

                  </div>

                )}

              </div>

            </div>

          )}


          {/* ==========================================
              UC10.8 - AI Career Chat
          ========================================== */}

          <div className="career-chat">

            <h2 className="dashboard-title">
              AI Career Chat
            </h2>

            <p className="career-chat-description">
              Ask questions about your resume, jobs,
              skill gaps, and career recommendations.
              The AI uses your resume and relevant job
              information to provide grounded answers.
            </p>


            {/* Suggested Questions */}

            <div className="chat-suggestions">

              <button
                onClick={() =>
                  setChatQuestion(
                    "Why is this job a good match for me?"
                  )
                }
              >
                Why is this job a good match for me?
              </button>

              <button
                onClick={() =>
                  setChatQuestion(
                    "Which required skills am I missing?"
                  )
                }
              >
                Which skills am I missing?
              </button>

              <button
                onClick={() =>
                  setChatQuestion(
                    "What should I learn next?"
                  )
                }
              >
                What should I learn next?
              </button>

              <button
                onClick={() =>
                  setChatQuestion(
                    "Which jobs require Spring Boot?"
                  )
                }
              >
                Which jobs require Spring Boot?
              </button>

            </div>


            {/* Chat Input */}

            <div className="chat-input-box">

              <textarea
                value={chatQuestion}
                onChange={(event) =>
                  setChatQuestion(
                    event.target.value
                  )
                }
                placeholder="Ask something about your career..."
                rows="4"
              />

              <button
                className="chat-button"
                onClick={handleChat}
                disabled={chatLoading}
              >
                {chatLoading
                  ? "Thinking..."
                  : "Ask AI"}
              </button>

            </div>


            {/* Chat Error */}

            {chatError && (
              <p className="error-message">
                {chatError}
              </p>
            )}


            {/* AI Answer */}

            {chatAnswer && (
              <div className="chat-answer">

                <div className="chat-answer-header">

                  <span className="ai-icon">
                    ✨
                  </span>

                  <h3>
                    AI Career Assistant
                  </h3>

                </div>

                <p>
                  {chatAnswer}
                </p>

              </div>
            )}


            {/* Retrieved Context */}

            {chatContext.length > 0 && (

              <div className="chat-context">

                <h3>
                  Retrieved Job Context
                </h3>

                {chatContext.map(
                  (context, index) => (

                    <div
                      className="context-card"
                      key={index}
                    >

                      <p>
                        {context}
                      </p>

                    </div>

                  )
                )}

              </div>

            )}

          </div>


        </section>

      </main>

    </div>
  );
}


// ==========================================
// Skill Group Component
// ==========================================

function SkillGroup({
  title,
  skills,
}) {

  if (
    !skills ||
    skills.length === 0
  ) {
    return null;
  }

  return (
    <div className="skill-group">

      <h4>
        {title}
      </h4>

      <div className="skill-list">

        {skills.map(
          (skill, index) => (

            <span
              className="skill"
              key={index}
            >
              {skill}
            </span>

          )
        )}

      </div>

    </div>
  );
}


export default App;