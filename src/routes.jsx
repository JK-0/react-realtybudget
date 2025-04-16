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
import TransactionsCreate from "./components/TransactionsCreate";
import Tags from "./components/Tags"; // ⬅️ Import the Tags component
import CreateTag from "./components/CreateTag";
import Contributor from "./components/Contributor"; // New Component
import CreateContributor from "./components/CreateContributor"; // New Component

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
      <Route
        path="/project/:id/transactions/create"
        element={
          <PrivateRoute>
            <TransactionsCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/project/:id/tags"
        element={
          <PrivateRoute>
            <Tags />
          </PrivateRoute>
        }
      />
      <Route
        path="/project/:id/tags/create"
        element={
          <PrivateRoute>
            <CreateTag />
          </PrivateRoute>
        }
      />
      <Route
        path="/project/:id/contributor"
        element={
          <PrivateRoute>
            <Contributor />
          </PrivateRoute>
        }
      />
      <Route
        path="/project/:id/contributor/create"
        element={
          <PrivateRoute>
            <CreateContributor />
          </PrivateRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;
