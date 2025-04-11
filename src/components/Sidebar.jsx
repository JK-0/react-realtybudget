// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import { useProjectContext } from "../context/ProjectContext";
// import { getProjxList } from "../services/api";
// import { useEffect, useState } from "react";

const Sidebar = () => {
  const { projects } = useProjectContext();

  // const [projects, setProjects] = useState([]);
  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   const csrf = document.cookie.split("csrftoken=")[1]?.split(";")[0];

  //   if (!token) return;

  //   getProjxList(token, csrf)
  //     .then(async (res) => {
  //       if (res.status === 200) {
  //         const json = await res.json();
  //         setProjects(json.data || []);
  //       } else if (res.status === 401) {
  //         localStorage.clear();
  //         window.location.href = "/";
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch project list", err);
  //     });
  // }, []);


  return (
    <div
      className="bg-light border-end p-3 position-fixed overflow-auto"
      style={{
        width: "200px",
        top: "56px",
        bottom: 0,
        height: "calc(100vh - 56px)",
        zIndex: 1000,
      }}
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
          <li key={project.id} className="nav-item mb-2">
            <Link to={`/project/${project.id}`} className="nav-link d-flex align-items-center">
              <img
                src={project.project_logo || "https://cdn-icons-png.flaticon.com/24/2991/2991112.png"}
                alt="logo"
                className="me-2 rounded"
                width={24}
                height={24}
                style={{ objectFit: "cover" }}
              />
              <span style={{ fontSize: "0.9rem" }}>{project.project_name}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item mt-3">
          <Link to="/project/create" className="btn btn-sm btn-primary w-100">
            ➕ Create Project
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;