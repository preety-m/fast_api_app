import api from "./api";

export interface ResumeRequest {
  resume_text: string;
}

export interface ResumeResponse {
  analysis: string;
}

export const analyzeResume = async (
  data: ResumeRequest
): Promise<ResumeResponse> => {
  const response = await api.post("/rag/analyse-resume", data);
  return response.data;
};
