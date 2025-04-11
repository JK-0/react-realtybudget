// src/pages/CreateProject.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject as createProjectAPI } from "../services/api";
import { useProjectContext } from "../context/ProjectContext";

const CreateProject = () => {
  const navigate = useNavigate();
  const { fetchProjects } = useProjectContext();

  const [formData, setFormData] = useState({
    project_name: "",
    address: "",
    description: "",
    project_logo: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const csrfToken = document.cookie.split("csrftoken=")[1]?.split(";")[0];
  const accessToken = localStorage.getItem("access_token");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "project_logo") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, project_logo: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setLogoPreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("project_name", formData.project_name);
    data.append("address", formData.address);
    data.append("description", formData.description);
    if (formData.project_logo) {
      data.append("project_logo", formData.project_logo);
    }

    try {
      setLoading(true);
      const response = await createProjectAPI(data, accessToken, csrfToken);
      const json = await response.json();

      if (response.ok && json.success === 1) {
        alert("Project created successfully!");
        navigate(`/project/${json.data.id}`);
        await fetchProjects(); // ✅ Refresh sidebar
      } else {
        alert("Failed to create project.");
      }
    } catch (err) {
      console.error("Create error:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Create New Project</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            className="form-control"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Project Logo</label>
          <input
            type="file"
            className="form-control"
            name="project_logo"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {logoPreview && (
          <div className="mb-3">
            <label className="form-label d-block">Preview:</label>
            <img
              src={logoPreview}
              alt="Project Logo Preview"
              style={{ maxWidth: "200px", borderRadius: "8px" }}
            />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
