// src/components/FooterMenu.jsx
import { useNavigate } from "react-router-dom";

const FooterMenu = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-info text-white text-center py-3 mt-auto">
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-outline-light" onClick={() => navigate("/home")}>Home</button>
        <button className="btn btn-outline-light" onClick={() => navigate("/profile")}>Profile</button>
        <button className="btn btn-outline-light" onClick={() => navigate("/about")}>About</button>
      </div>
    </footer>
  );
};

export default FooterMenu;
