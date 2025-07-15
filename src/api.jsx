import axios from "axios";

// ✅ Base config
export const base = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ API object with all endpoints
const API = {
  // Reusable GET with optional query params
  getProjects: (params = "") => base.get(`projects/${params}`),
  getProject: (slug) => base.get(`projects/${slug}/`),
  getBlogs: () => base.get("blogs/").then(res => res.data),
  getBlog: (slug) => base.get(`blogs/${slug}/`).then(res => res.data),
  getSkills: () => base.get("skills/"),
  postContact: (data) => base.post("contact/", data),
  getServices: (params = "") => base.get(`services/${params}`),
};

export default API;
