import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

// 投票列表
export const getVotes = () => api.get("/votes");

// 單一投票
export const getVote = (id) => api.get(`/votes/${id}`);

// 投票
export const submitVote = (voteId, data) =>
  api.post(`/votes/${voteId}/vote`, data);

// admin
export const getAdminVotes = () => api.get("/admin/votes");

export const createVote = (data) =>
  api.post("/admin/votes", data);

export const deleteVote = (id) =>
  api.delete(`/admin/votes/${id}`);