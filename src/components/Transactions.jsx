// src/components/Transactions.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTransactionsByProject } from "../services/api";

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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Transactions for Project ID: {id}
        </h2>
        <button
          onClick={() => navigate(`/project/${id}/transactions/create`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Transaction
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && transactions.length === 0 && <p>No transactions found.</p>}

      {transactions.length > 0 && (
        <ul className="list-group">
          {transactions.map((txn) => (
            <li key={txn.id} className="list-group-item">
              <strong>{txn.description || "Untitled"}</strong> - ₹{txn.amount}
              <br />
              <small>{txn.created_at}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
