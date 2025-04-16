// src/components/Contributor.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContributorsByProject, deleteContributor, } from "../services/api";

const Contributor = () => {
  const { id } = useParams(); // Get project ID from the URL
  const navigate = useNavigate(); // For programmatic navigation
  const [contributors, setContributors] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        const response = await getContributorsByProject(
          id,
          accessToken,
          csrfToken
        );
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

  const handleDelete = async (contributorId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contributor?");
    if (!confirmDelete) return;

    try {
      const res = await deleteContributor(contributorId, accessToken, csrfToken);
      if (res.ok) {
        setContributors((prev) =>
          prev.filter((c) => c.id !== contributorId)
        );
      } else {
        alert("Failed to delete contributor.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Contributors for Project ID: {id}</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate(`/project/${id}/contributor/create`)}
      >
        ➕ Create Contributor
      </button>

      {error && <div className="alert alert-danger">{error}</div>}

      {isLoading ? (
        <p>Loading contributors...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Profile Picture</th>
                <th>Bank Account Holder</th>
                <th>Bank Account Number</th>
                <th>IFSC Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contributors.length > 0 ? (
                contributors.map((contributor) => (
                  <tr key={contributor.id}>
                    <td>{contributor.name}</td>
                    <td>{contributor.email || "N/A"}</td>
                    <td>{contributor.phone_number || "N/A"}</td>
                    <td>{contributor.address || "N/A"}</td>
                    <td>
                      {contributor.profile_pic ? (
                        <img
                          src={contributor.profile_pic}
                          alt={contributor.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        "No profile picture"
                      )}
                    </td>
                    <td>{contributor.bank_account_holder_name || "N/A"}</td>
                    <td>{contributor.bank_account_holder_number || "N/A"}</td>
                    <td>{contributor.bank_account_ifsc_code || "N/A"}</td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(`/project/${id}/contributor/${contributor.id}/edit`)
                        }
                        className="btn btn-sm btn-warning me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(contributor.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No contributors available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Contributor;
