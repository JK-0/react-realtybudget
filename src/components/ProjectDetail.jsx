// src/components/ProjectDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById, updateProject, deleteProject } from "../services/api";
import { useProjectContext } from "../context/ProjectContext";


const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    project_name: "",
    address: "",
    description: "",
    project_logo: null,
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchProjects } = useProjectContext();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access_token");
  const csrfToken = localStorage.getItem("csrf_token");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectById(id, accessToken, csrfToken);
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const data = await response.json();
        setProject(data.data);

        setFormData({
          project_name: data.data.project_name || "",
          address: data.data.address || "",
          description: data.data.description || "",
          project_logo: null, // we will not set File here
        });

        if (data.data.project_logo) {
          setLogoPreview(`https://realtybudget.eitaa.in${data.data.project_logo}`);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, accessToken, csrfToken]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "project_logo") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, project_logo: file }));
      setLogoPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    const form = new FormData();
    form.append("project_name", formData.project_name);
    form.append("address", formData.address);
    form.append("description", formData.description);
    if (formData.project_logo) {
      form.append("project_logo", formData.project_logo);
    }

    try {
      const response = await updateProject(id, form, accessToken, csrfToken);
      if (!response.ok) throw new Error("Update failed");

      const res = await response.json();
      alert("Project updated successfully!");
      console.log("Update response:", res);
      await fetchProjects(); // ✅ Refresh sidebar
      navigate("/home");

    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating project.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
  
    try {
      const response = await deleteProject(id, accessToken, csrfToken);
      if (!response.ok) throw new Error("Delete failed");
  
      alert("Project deleted successfully!");
      await fetchProjects(); // ✅ Refresh sidebar
      navigate("/home");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting project.");
    }
  };
  
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Project Detail</h2>
      {loading ? (
        <p>Loading project data...</p>
      ) : project ? (
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="project_name" className="form-label">
              Project Name
            </label>
            <input
              type="text"
              className="form-control"
              id="project_name"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-12">
            <label htmlFor="project_logo" className="form-label">
              Project Logo
            </label>
            <input
              type="file"
              className="form-control"
              id="project_logo"
              name="project_logo"
              accept="image/*"
              onChange={handleChange}
            />
            {logoPreview && (
              <div className="mt-2">
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  style={{ maxWidth: "150px", border: "1px solid #ddd" }}
                />
              </div>
            )}
          </div>

          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Update Project
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete Project
            </button>

          </div>
        </form>
      ) : (
        <p>Project not found or failed to load.</p>
      )}
    </div>
  );
};

export default ProjectDetail;
