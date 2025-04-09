// src/routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import EmailStep from "./components/EmailStep";
import OtpStep from "./components/OtpStep";
import Home from "./components/Home";
import Profile from "./components/Profile";
import About from "./components/About";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";

const AppRoutes = () => {
  const isLoggedIn = !!localStorage.getItem("access_token");

  return (
    <Routes>
      {/* MainLayout wraps all routes that should have FooterWithSidebar */}
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <EmailStep />}
        />
        <Route
          path="/otp"
          element={isLoggedIn ? <Navigate to="/home" /> : <OtpStep />}
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
