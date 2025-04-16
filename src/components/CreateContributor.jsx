// src/components/CreateContributor.jsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createContributor } from "../services/api";

const CreateContributor = () => {
  const { id } = useParams(); // Project ID from route
  const navigate = useNavigate(); // For redirection

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    bank_account_holder_name: "",
    bank_account_holder_number: "",
    bank_account_ifsc_code: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate required field
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    setIsSubmitting(true);

    const accessToken = localStorage.getItem("access_token");
    const csrfToken = document.cookie.match(/csrftoken=([^;]*)/)?.[1];

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("project", id);
    if (profilePic) {
      formData.append("profile_pic", profilePic, profilePic.name);
    }

    try {
      const response = await createContributor(formData, accessToken, csrfToken);
      if (response.ok) {
        navigate(`/project/${id}/contributor`); // Redirect after success
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Failed to create contributor.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h3 className="mb-3">Create Contributor</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {[
            { label: "Name", name: "name" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phone_number" },
            { label: "Address", name: "address" },
            { label: "Bank Account Holder Name", name: "bank_account_holder_name" },
            { label: "Bank Account Number", name: "bank_account_holder_number" },
            { label: "Bank IFSC Code", name: "bank_account_ifsc_code" },
          ].map(({ label, name, type = "text" }) => (
            <div className="mb-3" key={name}>
              <label className="form-label">{label}</label>
              <input
                type={type}
                className="form-control"
                name={name}
                value={form[name]}
                onChange={handleChange}
                required={name === "name"}
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label">Profile Picture</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Create"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/project/${id}/contributor`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContributor;
