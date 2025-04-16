// src/components/Tags.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // Import useNavigate
import { getTagsByProject, deleteTag } from "../services/api";

const Tags = () => {
  const { id } = useParams(); // Get the project ID from the URL
  const navigate = useNavigate();  // Initialize the useNavigate hook
  const [tags, setTags] = useState([]); // Initialize tags as an empty array
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to retrieve CSRFToken and accessToken
  const getTokens = () => {
    const csrfToken = document.cookie.match(/csrftoken=([^;]*)/)?.[1];
    const accessToken = localStorage.getItem("access_token"); // Adjust if you store it elsewhere (e.g., cookies, context)

    return { csrfToken, accessToken };
  };

  // Error handler function
  const handleError = (error) => {
    console.error("API Error:", error);
    setError("An error occurred while fetching tags.");
  };

  // Fetch tags for a project on component mount
  useEffect(() => {
    const fetchTags = async () => {
      const { csrfToken, accessToken } = getTokens();
      if (!csrfToken || !accessToken) {
        setError("Missing authentication tokens.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await getTagsByProject(id, csrfToken, accessToken);
        if (response.ok) {
          const data = await response.json();
          // Access the 'data' array from the response and set it as the tags
          setTags(Array.isArray(data.data) ? data.data : []); // Ensure data.data is an array
        } else {
          throw new Error("Failed to fetch tags");
        }
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, [id]);

  // Handle create tag action (redirect to create tag page with project id)
  const handleCreateTag = () => {
    navigate(`/project/${id}/tags/create`);  // Redirect to the create tag page with project id
  };

  // Handle delete tag action
  const handleDeleteTag = async (tagId) => {
    const { csrfToken, accessToken } = getTokens();
    if (!window.confirm("Delete this tag?")) return;
    try {
      const response = await deleteTag(tagId, csrfToken, accessToken);
      if (response.ok) {
        setTags(tags.filter(tag => tag.id !== tagId));
      } else {
        setError("Failed to delete tag.");
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Handle edit tag action (redirect to edit tag page with project id and tag id)
  const handleEditTag = (tagId) => {
    navigate(`/project/${id}/tags/edit/${tagId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Tags for Project ID: {id}</h2>
      <p>This is the Tags page. You can display and manage tags here.</p>

      {/* Error message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* "Create Tag" button */}
      <button onClick={handleCreateTag} className="btn btn-primary mb-3">
        ➕ Create Tag
      </button>

      {/* Display tags */}
      {isLoading ? (
        <p>Loading tags...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Tag Name</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <tr key={tag.id}>
                    <td>{tag.tag_name}</td>
                    <td>{tag.description}</td>
                    <td>{new Date(tag.created_at).toLocaleString()}</td>
                    <td>{new Date(tag.updated_at).toLocaleString()}</td>
                    <td>
                      {/* Edit Button */}
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEditTag(tag.id)}
                      >
                        Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteTag(tag.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No tags available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tags;
