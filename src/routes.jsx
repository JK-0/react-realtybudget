// src/routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import EmailStep from "./components/EmailStep";
import OtpStep from "./components/OtpStep";
import Home from "./components/Home";
import Profile from "./components/Profile";
import About from "./components/About";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const AppRoutes = () => {

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <EmailStep />
          </PublicRoute>
        }
      />
      <Route
        path="/otp"
        element={
          <PublicRoute>
            <OtpStep />
          </PublicRoute>
        }
      />

      {/* Private Routes wrapped in PrivateRoute (which includes MainLayout) */}
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
    </Routes>
  );
};

export default AppRoutes;
