import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EmailStep from "./components/EmailStep";
import OtpStep from "./components/OtpStep";
import Home from "./components/Home";

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<EmailStep />} />
      <Route path="/otp" element={<OtpStep />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
