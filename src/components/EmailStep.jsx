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
    <div>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" />
      <button onClick={handleSubmit}>Send OTP</button>
    </div>
  );
};

export default EmailStep;
