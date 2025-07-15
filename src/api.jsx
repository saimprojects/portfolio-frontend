import axios from "axios";

// ✅ Dynamic baseURL from env
const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/";

// ✅ Axios base config
export const base = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ API object
const API = {
  getProjects: (params = "") => base.get(`projects/${params}`),
  getProject: (slug) => base.get(`projects/${slug}/`),
  getBlogs: () => base.get("blogs/").then(res => res.data),
  getBlog: (slug) => base.get(`blogs/${slug}/`).then(res => res.data),
  getSkills: () => base.get("skills/"),
  postContact: (data) => base.post("contact/", data),
  getServices: (params = "") => base.get(`services/${params}`),
};

export default API;
