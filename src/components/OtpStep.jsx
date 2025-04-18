// src/components/OtpStep.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateOtp } from "../services/api";
import { useProjectContext } from "../context/ProjectContext";

const OtpStep = () => {
  const [otp, setOtp] = useState("");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const { fetchProjects } = useProjectContext();

  const handleSubmit = async () => {
    const csrf = document.cookie.split('csrftoken=')[1]?.split(';')[0];
    const res = await validateOtp(email, otp, csrf);
    const data = await res.json();
    if (res.ok && data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      await fetchProjects(); // ✅ Refresh sidebar
      navigate("/home");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="mb-3 text-center">Enter OTP</h2>
        <input
          value={otp}
          onChange={e => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="form-control mb-3"
          type="text"
          required
        />
        <button onClick={handleSubmit} className="btn btn-primary w-100">
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OtpStep;
