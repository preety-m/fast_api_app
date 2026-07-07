import { useEffect, useState } from "react";

import JobCard from "../components/JobCard";

import {
    getJobs,
    createJob,
    updateJob,
    deleteJob,
} from "../Services/JobService";

import { getCompanies } from "../Services/CompanyService";

import type { Job } from "../types/job";
import type { Company } from "../types/company";

function Jobs() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [profileSearch, setProfileSearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [isRemote, setIsRemote] = useState(false);
    const [minSalary, setMinSalary] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);

        try {
            const [jobData, companyData] = await Promise.all([
                getJobs(),
                getCompanies(),
            ]);

            setJobs(jobData);
            setCompanies(companyData);
        } catch (err) {
            console.error(err);
            setError("Failed to load jobs.");
        } finally {
            setLoading(false);
        }
    }

    async function handleAdd(job: Job) {
        try {
            const newJob = await createJob(job);

            setJobs((prev) => [...prev, newJob]);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleEdit(job: Job) {
        try {
            const updatedJob = await updateJob(job.id, job);

            setJobs((prev) =>
                prev.map((j) =>
                    j.id === updatedJob.id ? updatedJob : j
                )
            );
        } catch (err) {
            console.error(err);
        }
    }

    async function handleDelete(id: number) {
        try {
            await deleteJob(id);

            setJobs((prev) =>
                prev.filter((job) => job.id !== id)
            );
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) {
        return (
            <div className="page-container">
                <h1>Jobs</h1>
                <div className="skeleton-container">
                    <div className="skeleton-card"></div>
                    <div className="skeleton-card"></div>
                    <div className="skeleton-card"></div>
                </div>
            </div>
        );
    }


    if (error) {
        return <h2>{error}</h2>;
    }

    const filteredJobs = jobs.filter((job) => {
        const jobCompany = companies.find((c) => c.id === job.company_id);
        const companyLocation = jobCompany ? jobCompany.location : "Remote";

        const matchesProfile = job.title.toLowerCase().includes(profileSearch.toLowerCase());
        const matchesLocation = companyLocation.toLowerCase().includes(locationSearch.toLowerCase());

        const matchesSalary = job.salary >= minSalary;

        const matchesRemote = !isRemote ||
            companyLocation.toLowerCase().includes("remote") ||
            companyLocation.toLowerCase().includes("work from home");

        return matchesProfile && matchesLocation && matchesSalary && matchesRemote;
    });

    return (
        <div className="job-search-layout">
            {/* LEFT SIDEBAR: FILTERS */}
            <aside className="filters-sidebar">
                <div className="filter-header">
                    <h3>📍 Filters</h3>
                    <button className="clear-btn" onClick={() => {
                        setProfileSearch("");
                        setLocationSearch("");
                        setIsRemote(false);
                        setMinSalary(0);
                    }}>Clear all</button>
                </div>

                <div className="filter-group">
                    <label>Profile</label>
                    <input
                        type="text"
                        placeholder="e.g. Software Developer"
                        value={profileSearch}
                        onChange={(e) => setProfileSearch(e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <label>Location</label>
                    <input
                        type="text"
                        placeholder="e.g. Bangalore"
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                    />
                </div>

                <div className="filter-group-checkbox">
                    <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            checked={isRemote}
                            onChange={(e) => setIsRemote(e.target.checked)}
                        /> Work from home / Remote
                    </label>
                </div>

                <div className="filter-group">
                    <label>Desired minimum salary: {minSalary} LPA</label>
                    <input
                        type="range"
                        min="0"
                        max="30"
                        value={minSalary}
                        onChange={(e) => setMinSalary(Number(e.target.value))}
                    />
                </div>
            </aside>

            {/* RIGHT SIDEBAR: LISTINGS */}
            <main className="job-feed-list">
                <div className="feed-header">
                    <h2>{filteredJobs.length} Total Jobs Found</h2>
                </div>

                <JobCard
                    jobs={filteredJobs}
                    companies={companies}
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </main>
        </div>
    );
}

export default Jobs;