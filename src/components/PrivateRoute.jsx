// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FooterMenu from "./FooterMenu";


const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div style={{ display: "flex", minHeight: "90vh" }}>
        <Sidebar />
        <div
          className="d-flex flex-column"
          style={{ width: "100%" }}
        >
          <div className="flex-grow-1 p-4">{children}</div>
          <FooterMenu />
        </div>
      </div>
    </>
  );
};


export default PrivateRoute;
