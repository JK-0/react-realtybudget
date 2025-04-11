// src/components/Transactions.jsx
import { useParams } from "react-router-dom";

const Transactions = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h2>Transactions for Project ID: {id}</h2>
      {/* You can add your transaction list or UI here */}
    </div>
  );
};

export default Transactions;
