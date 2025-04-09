// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-light border-end p-3" style={{ width: "200px" }}>
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
      </ul>
    </div>
  );
};

export default Sidebar;
