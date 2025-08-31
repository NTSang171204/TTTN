import axios from "axios";

const API_URL = "http://localhost:3000/api/technology";

export const getTechnologies = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTechnology = async (data: { name: string; file: File }) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("icon", data.file);

  const res = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Nếu bạn muốn truyền object { name, file }
export const updateTechnology = async (id: number, data: { name?: string; file?: File }) => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.file) formData.append("icon", data.file);
  
    const res = await axios.put(`${API_URL}/api/technology/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  };
  

export const deleteTechnology = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
