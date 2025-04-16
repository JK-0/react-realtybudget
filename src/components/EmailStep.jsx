import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../services/api";

const EmailStep = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const csrf = document.cookie.split('csrftoken=')[1]?.split(';')[0];
    await sendOtp(email, csrf);
    localStorage.setItem("email", email);
    navigate("/otp");
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="mb-3 text-center">Login</h2>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="form-control mb-3"
          type="email"
          required
        />
        <button onClick={handleSubmit} className="btn btn-primary w-100">
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default EmailStep;
