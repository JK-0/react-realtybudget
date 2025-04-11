// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { ProjectProvider } from "./context/ProjectContext";

function App() {
  return (
    <ProjectProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ProjectProvider>
  );
}

export default App;
