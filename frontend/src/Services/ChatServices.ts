import api from "./api";
import type { ChatRequest, ChatResponse } from "../types/chat";

export const askCareer = async (
  data: ChatRequest
): Promise<ChatResponse> => {
  const response = await api.post("/chat/", data);
  return response.data;
};