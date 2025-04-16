// src/components/Header.jsx
import { Link, useNavigate, useMatch, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Match only when the current route is exactly /project/:id
  const matchProjectDetail = useMatch("/project/:id/*");

  // Check if the current route is "/project/create"
  const isProjectCreatePage = location.pathname === "/project/create";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid justify-content-end">

        {/* Conditionally render the project buttons if not on /project/create route */}
        {!isProjectCreatePage && matchProjectDetail && (
          <>
            <Link
              to={`/project/${matchProjectDetail.params.id}/tags`}
              className="btn btn-outline-warning me-2"
            >
              Tags
            </Link>
            <Link
              to={`/project/${matchProjectDetail.params.id}/transactions`}
              className="btn btn-outline-info me-2"
            >
              Transactions
            </Link>
            <Link
              to={`/project/${matchProjectDetail.params.id}/contributor`}
              className="btn btn-outline-info me-2"
            >
              Contributors
            </Link>
          </>
        )}

        <Link to="/home" className="btn btn-outline-light me-2">Home</Link>
        <Link to="/about" className="btn btn-outline-light me-2">About</Link>
        <Link to="/profile" className="btn btn-outline-light me-2">Profile</Link>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
    </nav>
  );
};

export default Header;
