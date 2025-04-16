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
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                {/* <th>Transaction ID</th> */}
                <th>Amount</th>
                <th>Type</th>
                <th>Sub Type</th>
                <th>Description</th>
                <th>Created At</th>
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
