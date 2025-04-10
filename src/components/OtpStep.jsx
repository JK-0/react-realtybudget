// src/components/OtpStep.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateOtp } from "../services/api";

const OtpStep = () => {
  const [otp, setOtp] = useState("");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const csrf = document.cookie.split('csrftoken=')[1]?.split(';')[0];
    const res = await validateOtp(email, otp, csrf);
    const data = await res.json();
    if (res.ok && data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      navigate("/home");
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" />
      <button onClick={handleSubmit}>Verify OTP</button>
    </div>
  );
};

export default OtpStep;
