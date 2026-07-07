import { useState } from "react";
import "./JobCard.css";
import type { Job } from "../types/job";
import type { Company } from "../types/company";

type Props = {
  jobs: Job[];
  companies: Company[];
  onAdd: (job: Job) => void;
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
};

function JobCard({ jobs, companies, onAdd, onEdit, onDelete }: Props) {
  const [editJobId, setEditJobId] = useState<number | null>(null);
  
  const [addForm, setAddForm] = useState<Job>({
    id: 0,
    title: "",
    description: "",
    company_id: 0,
    salary: 0,
  });

  const [editForm, setEditForm] = useState<Job>({
    id: 0,
    title: "",
    description: "",
    company_id: 0,
    salary: 0,
  });

  const handleAdd = () => {
    if (!addForm.title || !addForm.company_id) {
      alert("Please enter a title and select a company");
      return;
    }
    onAdd(addForm);
    setAddForm({
      id: 0,
      title: "",
      description: "",
      company_id: 0,
      salary: 0,
    });
  };

  const handleSave = () => {
    onEdit(editForm);
    setEditJobId(null);
  };

  return (
    <div className="job-container">
      <div className="job-grid">
        {jobs.map((job) => {
          const jobCompany = companies.find((c) => c.id === job.company_id);
          const companyName = jobCompany ? jobCompany.name : "Unknown Company";
          const companyLocation = jobCompany ? jobCompany.location : "Remote";

          return (
            <div key={job.id} className="job-card">
              {editJobId === job.id ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <input
                    type="text"
                    value={editForm.title}
                    placeholder="Job Title"
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                  <select
                    value={editForm.company_id || ""}
                    onChange={(e) => setEditForm({ ...editForm, company_id: Number(e.target.value) })}
                  >
                    <option value="">Select Company</option>
                    {companies.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={editForm.salary}
                    placeholder="Salary (LPA)"
                    onChange={(e) => setEditForm({ ...editForm, salary: parseInt(e.target.value) || 0 })}
                  />
                  <textarea
                    value={editForm.description}
                    placeholder="Description"
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                  <div className="job-buttons">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditJobId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h2>{job.title}</h2>
                  <p className="job-company">🏢 {companyName}</p>
                  <div className="job-badges">
                    <span className="job-pill location-pill">📍 {companyLocation}</span>
                    <span className="job-pill salary-pill"> ₹{job.salary} LPA</span>
                  </div>
                  {job.description && (
                    <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginTop: "8px" }}>
                      {job.description}
                    </p>
                  )}
                  <div className="job-buttons">
                    <button onClick={() => { setEditJobId(job.id); setEditForm(job); }}>
                      Edit
                    </button>
                    <button onClick={() => onDelete(job.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="add-job-form">
        <h3>Add New Job</h3>
        <input
          type="text"
          placeholder="Job Title"
          value={addForm.title}
          onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
        />
        <select
          value={addForm.company_id || ""}
          onChange={(e) => setAddForm({ ...addForm, company_id: Number(e.target.value) })}
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Salary (LPA, e.g. 12)"
          value={addForm.salary || ""}
          onChange={(e) => setAddForm({ ...addForm, salary: parseInt(e.target.value) || 0 })}
        />
        <textarea
          placeholder="Job Description..."
          value={addForm.description}
          onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
        />
        <button onClick={handleAdd}>Add Job</button>
      </div>
    </div>
  );
}

export default JobCard;
