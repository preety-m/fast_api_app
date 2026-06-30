import { getCompanies } from "../Services/CompanyService";
import { useEffect, useState } from "react";
import type { Company } from "../types/company";

function CompanyCard() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchCompanies() {
    try {
      setLoading(true);
      const data = await getCompanies();
      setCompanies(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching companies:", err);
      setError("Failed to load companies");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading companies...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "20px",
      padding: "20px",
      maxWidth: "100%",
      boxSizing: "border-box",
      textAlign: "left"
    }}>
      {companies.length === 0 ? (
        <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--text)" }}>
          No companies found.
        </div>
      ) : (
        companies.map((company) => (
          <div key={company.id} style={{
            background: "var(--code-bg)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "var(--shadow)",
            transition: "transform 0.2s, border-color 0.2s",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}>
            <h2 style={{ margin: "0 0 8px 0", color: "var(--text-h)" }}>{company.name}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px" }}>
              <div><strong>Email:</strong> {company.email}</div>
              <div><strong>Phone:</strong> {company.phone}</div>
              <div><strong>Location:</strong> {company.location}</div>
            </div>
            {company.jobs && company.jobs.length > 0 && (
              <div style={{ marginTop: "12px", borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "var(--text-h)" }}>Available Jobs:</h3>
                <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14px" }}>
                  {company.jobs.map((job, idx) => (
                    <li key={idx} style={{ marginBottom: "4px" }}>
                      <strong>{job.title}</strong> ({job.salary} LPA)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default CompanyCard;