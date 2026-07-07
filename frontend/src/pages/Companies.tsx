import { useEffect, useState } from "react";

import CompanyCard from "../components/CompanyCard";

import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../Services/CompanyService";

import { getJobs } from "../Services/JobService";

import type { Company } from "../types/company";
import type { Job } from "../types/job";

function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    try {
      const [companyData, jobData] = await Promise.all([
        getCompanies(),
        getJobs(),
      ]);

      setCompanies(companyData);
      setJobs(jobData);
    } catch (err) {
      setError("Failed to load companies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(company: Company) {
    try {
      const newCompany = await createCompany(company);

      setCompanies((prev) => [...prev, newCompany]);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleEdit(company: Company) {
    try {
      const updatedCompany = await updateCompany(company.id, company);

      setCompanies((prev) =>
        prev.map((c) =>
          c.id === updatedCompany.id ? updatedCompany : c
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteCompany(id);

      setCompanies((prev) =>
        prev.filter((company) => company.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return <h2>Loading Companies...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="page-container">

      <h1>Companies</h1>

      <CompanyCard
        companies={companies}
        jobs={jobs}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default Companies;