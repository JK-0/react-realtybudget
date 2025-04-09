// src/components/MainLayout.jsx
import { Outlet } from "react-router-dom";
import FooterWithSidebar from "./FooterWithSidebar";

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <FooterWithSidebar />
    </div>
  );
};

export default MainLayout;
