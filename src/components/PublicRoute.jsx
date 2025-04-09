import { Navigate } from "react-router-dom";
import Footer from "./Footer";

const PublicRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("access_token");

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <div
        style={{
          minHeight: "calc(100vh - 40px)", // adjust for footer height
          paddingBottom: "40px",
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PublicRoute;
