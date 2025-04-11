// src/context/ProjectContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getProjxList } from "../services/api";

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const token = localStorage.getItem("access_token");
    const csrf = document.cookie.split("csrftoken=")[1]?.split(";")[0];
    if (!token) return;

    try {
      const res = await getProjxList(token, csrf);
      if (res.status === 200) {
        const json = await res.json();
        setProjects(json.data || []);
      } else if (res.status === 401) {
        localStorage.clear();
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Failed to fetch project list", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, fetchProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};
