// src/components/Contributor.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContributorsByProject } from "../services/api";

const Contributor = () => {
  const { id } = useParams(); // Get project ID from the URL
  const navigate = useNavigate(); // For programmatic navigation
  const [contributors, setContributors] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Extract the access token and csrf token from storage and cookies
  const accessToken = localStorage.getItem("access_token");
  const csrfToken = document.cookie.match(/csrftoken=([^;]*)/)?.[1];

  useEffect(() => {
    const fetchContributors = async () => {
      if (!accessToken || !csrfToken) {
        setError("Authentication failed. Tokens are missing.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await getContributorsByProject(id, accessToken, csrfToken);
        if (response.ok) {
          const data = await response.json();
          setContributors(data.data || []);
        } else {
          throw new Error("Failed to fetch contributors.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributors();
  }, [id, accessToken, csrfToken]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Contributors for Project ID: {id}</h2>
      <p>This is the Contributors page. You can view the list of contributors here.</p>

      {/* Button to navigate to create contributor form */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate(`/project/${id}/contributor/create`)}
      >
        Create Contributor
      </button>

      {/* Error message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Loading state */}
      {isLoading ? (
        <p>Loading contributors...</p>
      ) : (
        <ul>
          {contributors.length > 0 ? (
            contributors.map((contributor) => (
              <li key={contributor.id}>
                <strong>{contributor.name}</strong>: {contributor.role}
              </li>
            ))
          ) : (
            <p>No contributors available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Contributor;
