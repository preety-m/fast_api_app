import axios from "axios";
import type { Job } from "../types/job";

const API_BASE_URL = "http://localhost:8000";

export async function getJobs(): Promise<Job[]> {
    const response = await axios.get(`${API_BASE_URL}/job/`);
    return response.data;
}
