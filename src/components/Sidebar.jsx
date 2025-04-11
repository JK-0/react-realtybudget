// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import { useProjectContext } from "../context/ProjectContext";

const Sidebar = () => {
  const { projects } = useProjectContext();

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
          <li key={project.id} className="nav-item mb-2 d-flex align-items-center">
            <Link to={`/project/${project.id}`}>
              <img
                src={project.project_logo || "https://cdn-icons-png.flaticon.com/24/2991/2991112.png"}
                alt="logo"
                className="me-2 rounded"
                width={24}
                height={24}
                style={{ objectFit: "cover" }}
              />
            </Link>
            <Link
              to={`/project/${project.id}/transactions`}
              className="nav-link p-0"
              style={{ fontSize: "0.9rem" }}
            >
              {project.project_name}
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
