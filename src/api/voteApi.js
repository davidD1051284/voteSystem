import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

//註冊
export const Register = (data) => api.post("/auth/register", data);

//登入
export const Login = (data) => api.post("/auth/login", data);

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

//無法二次投票
export const checkHasVoted = (voteId, userId) =>
  api.get(`/votes/${voteId}/has-voted`, {
    params: { userId }
  });