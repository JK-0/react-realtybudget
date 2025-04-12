// components/TransactionsCreate.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTransaction } from "../services/api";

const TransactionsCreate = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    amount: "",
    transaction_type: "in",
    transaction_sub_in: "cash",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const csrfToken = document.cookie.split("csrftoken=")[1]?.split(";")[0];
  const accessToken = localStorage.getItem("access_token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...form,
        project: projectId,
      };

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

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="mb-4 text-xl font-semibold">Create Transaction</h2>

      {error && <div className="mb-2 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Transaction Type</label>
          <select
            name="transaction_type"
            value={form.transaction_type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="in">In</option>
            <option value="out">Out</option>
          </select>
        </div>

        {form.transaction_type === "in" && (
          <div>
            <label className="block mb-1">Transaction Sub In</label>
            <select
              name="transaction_sub_in"
              value={form.transaction_sub_in}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
              <option value="upi">UPI</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Transaction"}
        </button>
      </form>
    </div>
  );
};

export default TransactionsCreate;
