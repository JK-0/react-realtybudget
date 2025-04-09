// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid justify-content-end">
        <Link to="/home" className="btn btn-outline-light me-2">Home</Link>
        <Link to="/about" className="btn btn-outline-light me-2">About</Link>
        <Link to="/profile" className="btn btn-outline-light me-2">Profile</Link>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
    </nav>
  );
};

export default Header;