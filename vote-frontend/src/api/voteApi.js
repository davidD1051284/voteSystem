import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const getVotes = () => api.get("/votes");

export const vote = (voteId, data) =>
  api.post(`/votes/${voteId}/vote`, data);

export const getAdminVotes = () =>
  api.get("/admin/votes");

export const createVote = (data) =>
  api.post("/admin/votes", data);

export const deleteVote = (id) =>
  api.delete(`/admin/votes/${id}`);