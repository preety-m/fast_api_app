import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getJobs } from "../Services/JobService";
import { getCompanies } from "../Services/CompanyService";
import type { Job } from "../types/job";
import type { Company } from "../types/company";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch data for latest jobs
    async function loadData() {
      try {
        const [jobData, companyData] = await Promise.all([
          getJobs(),
          getCompanies()
        ]);
        setJobs(jobData);
        setCompanies(companyData);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    }
    loadData();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="dashboard-container">
      
      {/* 1. Header Section */}
      <header className="dashboard-header-block">
        <h1>TalentSpark</h1>
      </header>

      {/* 2. Search Input */}
      <form onSubmit={handleSearchSubmit} className="dashboard-search-form">
        <input
          type="text"
          placeholder="🔍 Search jobs (e.g. Software Engineer)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="dashboard-search-input"
        />
      </form>

      <hr className="divider-line" />

      {/* 3. Quick Actions */}
      <section className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          
          <Link to="/resume" className="action-card-link">
            <div className="action-card">
              <span className="action-icon">📄</span>
              <span className="action-title">Analyze Resume</span>
            </div>
          </Link>

          <Link to="/resume" className="action-card-link">
            <div className="action-card">
              <span className="action-icon">⬆</span>
              <span className="action-title">Upload Resume</span>
            </div>
          </Link>

          <Link to="/jobs" className="action-card-link">
            <div className="action-card">
              <span className="action-icon">💼</span>
              <span className="action-title">Browse Jobs</span>
            </div>
          </Link>

          <Link to="/companies" className="action-card-link">
            <div className="action-card">
              <span className="action-icon">🏢</span>
              <span className="action-title">Companies</span>
            </div>
          </Link>

        </div>
      </section>

      <hr className="divider-line" />

      {/* 4. Latest Jobs */}
      <section className="latest-jobs-section">
        <div className="section-header">
          <h2>Latest Jobs</h2>
          <Link to="/jobs" className="view-all-link">View All →</Link>
        </div>

        <div className="latest-jobs-list">
          {jobs.slice(0, 3).map((job) => {
            const jobCompany = companies.find((c) => c.id === job.company_id);
            const companyName = jobCompany ? jobCompany.name : "Unknown Company";
            return (
              <div key={job.id} className="latest-job-row">
                <span className="job-title-text">{job.title}</span>
                <span className="job-company-text">{companyName}</span>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

export default Home;