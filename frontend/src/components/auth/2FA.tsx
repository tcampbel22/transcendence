import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OTPInput: React.FC = () => {
  const [otp, setOtp] = useState<string>(""); 
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const API_AUTH = import.meta.env.VITE_API_AUTH; // Adjusted API URL
  const [isResending, setIsResending] = useState<boolean>(false); // Track resend status

  const navigate = useNavigate();
  const location = useLocation();
  const { userData, otpToken } = location.state || {}; // Extract values safely

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
	  navigate("/hub", { state: userData }); 
      return;
    }

    try {
      console.log("Sending OTP verification request:", { otp, otpToken });
      const response = await axios.post(`${API_AUTH}/verify-otp`, { otp, otpToken });

      if (response.data.success) {
        setSuccessMessage("OTP verified successfully!");
        navigate("/hub", { state: userData }); // Redirect after successful verification
      } else {
        setError("Invalid or expired OTP. Please try again.");
      }
    } catch (error) {
      setError("Error during verification. Check your connection.");
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setOtp(""); 
    setError(null); 
    setSuccessMessage(null);

    try {
      console.log("Resending OTP to:", userData.email);

      const response = await axios.post(`${API_AUTH}/send-email`, { to: userData.email });

      if (response.data.success) {
        console.log("New OTP token:", response.data.token);
        setSuccessMessage("A new code has been sent to your email.");
        navigate("/2fa", { state: { userData, otpToken: response.data.token } });
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setError("Error resending OTP. Check your connection.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="otp-container min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat text-white"
         style={{ backgroundImage: "url('/images/background.jpg')" }}>
      <p className="text-lg font-bold text-white-500">
        Enter the authentication code sent to <strong>{userData?.email}</strong>:
      </p>
      <input
        type="text"
        value={otp}
        onChange={handleChange}
        placeholder="123456"
        maxLength={6}
        className="w-40 text-center p-2 text-lg bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      {error && <p className="text-white-500 font-bold text-lg">{error}</p>}
      {successMessage && <p className="text-white-500 font-bold text-lg">{successMessage}</p>}
      <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Verify OTP
      </button>
      <button
        onClick={handleResendOTP}
        disabled={isResending}
        className={`mt-2 px-4 py-2 rounded-md ${isResending ? "bg-gray-500 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"} text-white`}
      >
        {isResending ? "Resending..." : "Resend Code"}
      </button>
    </div>
  );
};

export default OTPInput;
