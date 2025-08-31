import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api" });


// Nếu có token thì tự động thêm vào header
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // lấy token đã lưu khi login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // gắn token vào header
  }
  return config; // trả config mới có header Authorization
});

//APi login
export const login = (credentials: { email: string; password: string }) =>
  API.post("/auth/login", credentials);

// API register
export const register = (data: { username: string; email: string; password: string }) =>
  API.post("/auth/register", data);


// Knowledge APIs


//Create new knowledge api
export const createKnowledge = (data: {
  technology: string;
  level: string;
  title: string;
  content: string;
  tags: string[];
}) => API.post("/knowledge", data)



//Fetch all technologies
export const getTechnologies = async () => {
  try {
    const res = await API.get("/technology");
    return res.data;
  } catch (error) {
    console.error("Error fetching technologies:", error);
    throw error;
  }
}

//Fetch knowledges that users searched:
export const searchKnowledges = async (params: { 
  technology?: string; 
  level?: string; 
  keywords?: string }) => {
  try {
    const res = await API.get("/knowledge/search", {
      params: {
        technology: params.technology !== "All Technology" ? params.technology : "",
        level: params.level !== "Level" ? params.level : "",
        keyword: params.keywords || "",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error searching knowledge:", error);
    throw error;
  }
}

//Fetch knowledge by ID
export const getKnowledgeById = async (id: string) => {
  try {
    const res = await API.get(`/knowledge/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching knowledge by ID:", error);
    throw error;
  }
}

//Post a comment:
export async function postComment(knowledgeId: string, content: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await API.post(
    `/knowledge/${knowledgeId}/comments`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(res.data);
  return res.data;
}


export default API;