import api from "./api"; // Adjust the path if needed
import type { Company } from "../types/company";

export async function getCompanies(): Promise<Company[]> {
    const response = await api.get("/company/");
    return response.data;
}

export async function getCompanyById(id: string): Promise<Company> {
    const response = await api.get(`/company/${id}`);
    return response.data;
}

export async function createCompany(company: Company): Promise<Company> {
    const response = await api.post("/company/", company);
    return response.data;
}

export async function updateCompany(id: string, company: Company): Promise<Company> {
    const response = await api.put(`/company/${id}`, company);
    return response.data;
}

export async function deleteCompany(id: string): Promise<Company> {
    const response = await api.delete(`/company/${id}`);
    return response.data;
}