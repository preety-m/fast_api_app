import { useState } from "react";
import { analyzeResume } from "../Services/ResumeService";

function Resume() {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError("Please paste your resume text first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      const response = await analyzeResume({ resume_text: resumeText });
      setAnalysis(response.analysis);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ padding: "24px" }}>
      <h1>📄 Resume Analyzer</h1>
      <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
        Paste your resume text below to analyze key skills, strengths, and areas to improve.
      </p>

      <div className="resume-layout" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <textarea
          rows={10}
          placeholder="Paste your plain resume text here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          style={{
            width: "100%",
            background: "rgba(30, 41, 59, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            color: "white",
            padding: "16px",
            fontSize: "1rem",
            outline: "none",
            resize: "vertical",
          }}
        />

        {error && <p style={{ color: "#ef4444", margin: 0 }}>⚠️ {error}</p>}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            width: "fit-content",
            alignSelf: "flex-end",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </button>

        {analysis && (
          <div 
            className="analysis-result-card"
            style={{
              background: "rgba(30, 41, 59, 0.45)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              padding: "24px",
              marginTop: "20px",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.25)",
            }}
          >
            <h2 style={{ color: "#f8fafc", marginTop: 0 }}>📊 Analysis Results</h2>
            <div 
              style={{ 
                color: "#cbd5e1", 
                whiteSpace: "pre-line", 
                lineHeight: "1.6",
                fontSize: "1.05rem" 
              }}
            >
              {analysis}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Resume;