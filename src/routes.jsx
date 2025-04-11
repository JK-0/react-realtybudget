// src/routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import EmailStep from "./components/EmailStep";
import OtpStep from "./components/OtpStep";
import Home from "./components/Home";
import Profile from "./components/Profile";
import About from "./components/About";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ProjectDetail from "./components/ProjectDetail"; // ⬅️ Import this
import CreateProject from "./components/CreateProject";
import Transactions from "./components/Transactions";

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
      <Route
        path="/project/:id"
        element={
          <PrivateRoute>
            <ProjectDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/project/create"
        element={
          <PrivateRoute>
            <CreateProject />
          </PrivateRoute>
        }
      />
      <Route
        path="/project/:id/transactions"
        element={
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
