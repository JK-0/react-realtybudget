// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import { getProjxList } from "../services/api";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const csrf = document.cookie.split("csrftoken=")[1]?.split(";")[0];

    if (!token) return;

    getProjxList(token, csrf)
      .then(async (res) => {
        if (res.status === 200) {
          const json = await res.json();
          setProjects(json.data || []);
        } else if (res.status === 401) {
          localStorage.clear();
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.error("Failed to fetch project list", err);
      });
  }, []);


  return (
    <div
      className="bg-light border-end vh-100 p-3 position-fixed"
      style={{ width: "200px", top: "56px" }}
    >
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/home" className="nav-link">🏠 Home</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/about" className="nav-link">ℹ️ About</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/profile" className="nav-link">👤 Profile</Link>
        </li>

        <li className="nav-item mt-4 fw-bold">📁 Projects</li>
        {projects.map((project) => (
          <li key={project.id} className="nav-item mb-1">
            <Link to={`/project/${project.id}`} className="nav-link">
              {project.project_name}
            </Link>
          </li>
        ))}


      </ul>
    </div>
  );
};

export default Sidebar;