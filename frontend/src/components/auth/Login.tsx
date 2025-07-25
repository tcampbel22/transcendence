import { Link } from "react-router-dom";
import axios from "axios";
import api from "../../lib/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { TitleCard } from "../utils/TitleCard";
import { AuthInput } from "../utils/AuthInput";

const Login = () => {
  const API_URL = import.meta.env.VITE_API_USER;
	const API_AUTH = import.meta.env.VITE_API_AUTH;
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState("");
  const [googleClicked, setGoogleClicked] = useState(false);
  const navigate = useNavigate();


	const handleGoogleLogin = async () => {
		setGoogleClicked(true);
		window.open(`${API_AUTH}/google`, "GoogleLoginPopup", "width=500,height=600");
	};

	useEffect(() => {
		if (!googleClicked) return;
		const receiveMessage = (event:MessageEvent) => {
			if (event.origin !== "https://localhost:4433" && event.origin !== "http://localhost:5173") 
					return;
			if (!event.data.statusCode) {
          navigate('/hub', { state: { userId: event.data.userId, username: event.data.username } });
				}						 
			else {
				setLoginError("Unable to connect with Google Sign-In");
				setTimeout(() => {
					setLoginError('');
				  }, 3000);
			}
		};	  
		window.addEventListener("message", receiveMessage);	  
		return () => {
		  window.removeEventListener("message", receiveMessage);
		};
	  }, [googleClicked]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
		const loginInput = {
			username,
			password,
		}
		try {
			const response = await api.post(`${API_URL}/login`, loginInput, { withCredentials: true });
			const userEmail = response.data.email;

			// Request OTP
      if (!response.data.is2faEnabled) {
		localStorage.clear();
        navigate('/hub', { state: { userId: response.data.userId, username: response.data.username, is2faEnabled: response.data.is2faEnabled } });
        return;
      }
			const otpToken = await axios.post(`${API_AUTH}/send-email`, { to: userEmail });
			localStorage.clear();
			navigate('/2fa', { state: { userData: response.data, otpToken: otpToken.data.token } });
		} catch (error: any) {
			console.error("Error:", error.response?.data || error.message);
			setLoginError("invalid username or password")
			setTimeout(() => {
				setLoginError('');
			  }, 3000);
			return;
		}
		setPassword('')
		setUsername('')
	}

  return (
    <div className="flex flex-col justify-center items-center animate-fade-in">
      	<TitleCard image={"/images/pong.webp"} />
	  	<div className="basis-md p-10 rounded border-2 text-xl border-amber-200 flex flex-col items-center">
        	<h2 className="font-bold text-3xl mb-5 ">Login</h2>
			<form
				className="flex flex-col items-center gap-4 mb-6"
				onSubmit={handleSubmit}
				>
				<AuthInput type="text" placeholder="Username..." value={username} auto="Username" setValue={setUsername}/>
				<AuthInput type="password" placeholder="Password..." value={password} auto="Password" setValue={setPassword}/>
				<button
					type="submit"
					className="border border-amber-200 rounded px-2 py-1 mt-2 hover:bg-amber-200 hover:text-gray-900"
				>
					Sign in
				</button>
			</form>
			{loginError && (
			<p className="text-red-400 font-semibold text-center my-3">{loginError}</p> )}
			<p>
				Don't have an account?{" "}
				<Link to="/register" className="text-blue-600 hover:underline">
					Register
				</Link>
			</p>
			<button
				onClick={handleGoogleLogin}
				className="flex items-center border border-amber-200 font-medium rounded px-3 py-1 hover:bg-amber-200 hover:text-gray-900 mt-6"
				>
				<img
					src="/images/google-icon.webp"
					alt="Google Icon"
					className="w-8 h-8 mr-2"
				/>
				Login with Google
			</button>
      	</div>
    </div>
  );
};

export default Login;
