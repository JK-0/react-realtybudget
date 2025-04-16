// src/components/TransactionsCreate.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTransaction, getTagsByProject, getContributorsByProject } from "../services/api";
import Select from "react-select";  // Import React Select for multi-select dropdown

const TransactionsCreate = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    amount: "",
    transaction_type: "in", // Default to "in"
    transaction_sub_in: "cash", // Default to "cash" for "in" transaction type
    tags: [],  // Store selected tags
    contributor: null,  // Store selected contributor
    description: "", // Store the description of the transaction
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);  // Store available tags for the project
  const [contributors, setContributors] = useState([]);  // Store available contributors for the project
  const csrfToken = document.cookie.split("csrftoken=")[1]?.split(";")[0];
  const accessToken = localStorage.getItem("access_token");

  // Fetch tags and contributors when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tags
        const tagsResponse = await getTagsByProject(projectId, csrfToken, accessToken);
        if (tagsResponse.ok) {
          const tagsData = await tagsResponse.json();
          setTags(
            tagsData?.data?.map(tag => ({
              value: tag.id,
              label: tag.tag_name,
            })) || []
          );
        } else {
          setError("Failed to load tags.");
        }

        // Fetch contributors
        const contributorsResponse = await getContributorsByProject(projectId, accessToken, csrfToken);
        if (contributorsResponse.ok) {
          const contributorsData = await contributorsResponse.json();
          setContributors(
            contributorsData?.data?.map(contributor => ({
              value: contributor.id,
              label: contributor.name,
            })) || []
          );
        } else {
          setError("Failed to load contributors.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [projectId, csrfToken, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (selectedTags) => {
    setForm((prev) => ({
      ...prev,
      tags: selectedTags ? selectedTags.map(tag => tag.value) : [],
    }));
  };

  const handleContributorChange = (selectedContributor) => {
    setForm((prev) => ({
      ...prev,
      contributor: selectedContributor ? selectedContributor.value : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = new URLSearchParams();

      // Add other fields to the payload
      payload.append('amount', form.amount);
      payload.append('transaction_type', form.transaction_type);
      payload.append('transaction_sub_in', form.transaction_sub_in);
      payload.append('project', projectId);
      payload.append('description', form.description);  // Add description field

      // Add selected tags as separate 'tags' key-value pairs
      form.tags.forEach(tagId => {
        payload.append('tags', tagId);
      });

      // Add selected contributor
      payload.append('contributor', form.contributor);

      const res = await createTransaction(payload, accessToken, csrfToken);
      if (res.ok) {
        navigate(`/project/${projectId}/transactions`);
      } else {
        const data = await res.json();
        setError(data?.message || "Failed to create transaction.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Fixed options for `transaction_sub_in` and `transaction_sub_out`
  const transactionSubInOptions = [
    { value: "cash", label: "Cash" },
    { value: "bank", label: "Bank" },
  ];

  const transactionSubOutOptions = [
    { value: "expense", label: "Expense" },
    { value: "payment", label: "Payment" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Create Transaction</h2>

      {error && <div className="alert alert-danger mb-3">{error}</div>}

      <form onSubmit={handleSubmit} className="form-group">
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="transaction_type" className="form-label">Transaction Type</label>
          <select
            id="transaction_type"
            name="transaction_type"
            value={form.transaction_type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="in">In</option>
            <option value="out">Out</option>
          </select>
        </div>

        {form.transaction_type === "in" && (
          <div className="mb-3">
            <label htmlFor="transaction_sub_in" className="form-label">Transaction Sub Type (In)</label>
            <select
              id="transaction_sub_in"
              name="transaction_sub_in"
              value={form.transaction_sub_in}
              onChange={handleChange}
              className="form-select"
            >
              {transactionSubInOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {form.transaction_type === "out" && (
          <div className="mb-3">
            <label htmlFor="transaction_sub_out" className="form-label">Transaction Sub Type (Out)</label>
            <select
              id="transaction_sub_out"
              name="transaction_sub_out"
              value={form.transaction_sub_out}
              onChange={handleChange}
              className="form-select"
            >
              {transactionSubOutOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags</label>
          <Select
            isMulti
            options={tags}
            value={tags.filter(tag => form.tags.includes(tag.value))}
            onChange={handleTagsChange}
            getOptionLabel={(option) => option.label}
            className="form-control"
            placeholder="Select tags..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contributor" className="form-label">Contributor</label>
          <Select
            options={contributors}
            value={contributors.find(contributor => contributor.value === form.contributor) || null}
            onChange={handleContributorChange}
            getOptionLabel={(option) => option.label}
            className="form-control"
            placeholder="Select contributor..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter a description for the transaction"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-100"
        >
          {loading ? "Creating..." : "Create Transaction"}
        </button>
      </form>
    </div>
  );
};

export default TransactionsCreate;
