// src/components/CreateTag.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createTag } from "../services/api";  // Import the createTag function

const CreateTag = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tagName, setTagName] = useState("");
  const [description, setDescription] = useState("");  // New state for description
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTagNameChange = (e) => {
    setTagName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);  // Update description state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Create formData here in the component
    const formData = new URLSearchParams();
    formData.append("tag_name", tagName);
    formData.append("project", id);  // Use project ID from the route
    formData.append("description", description);  // Include description

    try {
      const csrfToken = localStorage.getItem("csrf_token");  // Retrieve CSRF token
      const accessToken = localStorage.getItem("access_token");  // Retrieve access token

      if (!accessToken) {
        throw new Error("User not authenticated");
      }

      const response = await createTag(formData, csrfToken, accessToken);

      if (response.ok) {
        // Redirect to the tags page on success
        navigate(`/project/${id}/tags`);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to create tag");
      }
    } catch (error) {
      setError(error.message || "An error occurred while creating the tag.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create a New Tag for Project ID: {id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tagName" className="form-label">
            Tag Name
          </label>
          <input
            type="text"
            className="form-control"
            id="tagName"
            value={tagName}
            onChange={handleTagNameChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Tag"}
        </button>
      </form>
    </div>
  );
};

export default CreateTag;
