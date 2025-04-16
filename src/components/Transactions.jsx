// src/components/Transactions.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTransactionsByProject, deleteTransaction } from "../services/api";

const Transactions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const csrfToken = document.cookie.split("csrftoken=")[1]?.split(";")[0];
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getTransactionsByProject(id, accessToken, csrfToken);
        if (res.ok) {
          const json = await res.json();
          setTransactions(json.data || []);
        } else {
          setError("Failed to fetch transactions.");
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id, accessToken, csrfToken]);

  // Handle delete transaction
  const handleDelete = async (txnId) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    try {
      const res = await deleteTransaction(txnId, accessToken, csrfToken);
      if (res.ok) {
        setTransactions(transactions.filter((txn) => txn.id !== txnId));
      } else {
        alert("Failed to delete transaction.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Transactions for Project ID: {id}</h2>
        <button
          onClick={() => navigate(`/project/${id}/transactions/create`)}
          className="btn btn-primary"
        >
          ➕ Create Transaction
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && transactions.length === 0 && <p>No transactions found.</p>}

      {transactions.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                {/* <th>Transaction ID</th> */}
                <th>Amount</th>
                <th>Type</th>
                <th>Sub Type</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  {/* <td>{txn.id}</td> */}
                  <td>₹{txn.amount}</td>
                  <td>{txn.transaction_type}</td>
                  <td>{txn.transaction_sub_in}</td>
                  <td>{txn.description || "Untitled"}</td>
                  <td>{new Date(txn.created_at).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/project/${id}/transactions/${txn.id}/edit`)
                      }
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(txn.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
