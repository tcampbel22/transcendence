import { Link } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";

const Login = () => {
	const API_URL = import.meta.env.VITE_API_USER;
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [loginError, setLoginError] = useState('');
	const navigate = useNavigate();
	const [googleClicked, setGoogleClicked] = useState(false);

	const handleGoogleLogin = async () => {
		window.open("https://localhost:4433/auth/google", "GoogleLoginPopup", "width=500,height=600");
		setGoogleClicked(prev => !prev);
	};

	useEffect(() => {

		if (!googleClicked) return;

		const receiveMessage = (event:MessageEvent) => {
			if (event.origin !== "https://localhost:4433" && event.origin !== "http://localhost:5173") 
					return;
			if (!event.data.statusCode) {
				navigate('/hub', { state: event.data.userId });
				}						 
			else {
				setLoginError("Unable to connect with Google Sign-In");
			}
		};	  
		window.addEventListener("message", receiveMessage);	  
		return () => {
		  window.removeEventListener("message", receiveMessage);
		};
	  }, [googleClicked]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		console.log("uname:", username) //testing purposes
		console.log("pword:", password)

		const loginInput = {
			username,
			password,
		}
		try {
			const response = await axios.post(`${API_URL}/login`, loginInput , { withCredentials: true });
			console.log("logged in succesfully", response.data);
			navigate('/hub', {state: response.data}); 
		} catch (error: any) {
			console.error("Error:", error.response?.data || error.message);
			// navigate('/hub')
			setLoginError("invalid username or password")
			return;
		}
		setPassword('')
		setUsername('')
	}

  	return (
	<div className="flex flex-col justify-center items-center min-h-screen gap-4 animate-fade-in">
		<div className="bg-beige p-10 rounded border-2 border-black flex flex-col items-center">
			<h1 className="font-bold text-5xl text-black mb-6">Welcome to Pong</h1>
			<h2 className="font-bold text-3xl mb-5 text-black">Login</h2>
			<form className="flex flex-col items-center gap-4 mb-6" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Username"
					className="border-2 border-black px-1 rounded w-auto focus:outline-none"
					value={username}
					autoComplete="Username"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					className="border-2 border-black px-1 rounded w-auto focus:outline-none"
					value={password}
					autoComplete="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					type="submit"
					className="border-2 border-black font-bold rounded px-2 hover:shadow-lg m-2 hover:bg-black hover:text-white"
				>
					Sign in
				</button>
			</form>
			{loginError && (
				<p className="text-red-600 font-semibold text-center my-2">{loginError}</p>
			)}
			<p>
				Don't have an account?{" "}
				<Link to="/register" className="text-blue-600 hover:underline">
					Register
				</Link>
			</p>
			<p>
				Forgot your password?{" "}
				<Link to="/restore_password" className="text-blue-600 hover:underline">
					Reset Password
				</Link>
			</p>
			<button
				onClick={handleGoogleLogin}
				className="flex items-center border-2 border-gray-300 font-medium rounded px-3 py-1 hover:shadow-lg bg-white hover:bg-gray-100 mt-6 text-sm"
			>
				<img
					src="/images/google-icon.png"
					alt="Google Icon"
					className="w-4 h-4 mr-2"
				/>
				Login with Google
			</button>
		</div>
	</div>
  	);
}

export default Login;