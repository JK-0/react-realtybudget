// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import MainLayout from "./MainLayout";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("access_token");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <MainLayout>{children}</MainLayout>;
};

export default PrivateRoute;
