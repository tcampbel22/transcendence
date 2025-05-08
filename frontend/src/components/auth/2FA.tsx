import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../../index.css";

const OTPInput: React.FC = () => {
  const [otp, setOtp] = useState<string>(""); 
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const location = useLocation();
  const { userData, otpToken } = location.state || {}; // Ensure correct keys


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d{0,6}$/.test(value)) { 
      setOtp(value);
      setError(null);
    } else {
      setError("The code must contain exactly 6 numeric digits.");
    }
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) { 
      setError("The code must be exactly 6 digits.");
      return;
    }

    try {
      const response = await axios.post("https://localhost:3003/verify-otp", { otp, otpToken });
      console.log("Response from OTP verification:", response.data);
      if (response.data.success) {
        setSuccessMessage("OTP verified successfully!");
        navigate("/hub", { state: userData }); // Redirect to the hub page        
      } else {
        setError("Invalid or expired OTP. Please try again.");
      }
    } catch (error) {
      setError("Error during verification. Check your connection.");
    }
  };

  return (
    <div className="otp-container">
      <h2>Two-Factor Authentication</h2>
      <p>Enter the authentication code sent to <strong>{userData?.email}</strong>:</p>
      <input
        type="text"
        value={otp}
        onChange={handleChange}
        placeholder="123456"
        maxLength={6}
        style={{ padding: "10px", fontSize: "16px", textAlign: "center" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <button onClick={handleSubmit} style={{ marginTop: "10px", padding: "8px", fontSize: "16px" }}>
        Verify OTP
      </button>
    </div>
  );
};

export default OTPInput;
