import { Link } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const API_URL = "https://localhost:4433"
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [loginError, setLoginError] = useState('');
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		console.log("uname:", username) //testing purposes
		console.log("pword:", password)

		const loginInput = {
			username,
			password,
		}
		try {
			//uncomment these when database is connected to the frontend
			const response = await axios.post(`${API_URL}/api/login`, loginInput)
			console.log("logged in succesfully", response.data)
			navigate('/hub')
		} catch (error: any) {
			console.error("Error:", error.response?.data || error.message);
			setLoginError("invalid username or password")
			return;
		}
		setPassword('')
		setUsername('')
	}

  	return (
		<div className='flex flex-col justify-center min-h-screen animate-fade-in'>
			<div className='bg-beige'>
			<h1 className="font-bold text-5xl text-black">Welcome to Pong</h1>
			<h2 className='font-bold text-3xl m-5 animate-fade-in text-black'>Login</h2>
			<form className="flex flex-col items-center gap-4 animate-slide-in" onSubmit={handleSubmit}>
				<input 	type="text"
						placeholder="Username"
						className='border-2 border-black px-1 rounded w-auto focus:outline-none'
						value={username}
						autoComplete='Username'
						onChange={(e) => setUsername(e.target.value)}
				/>
				<input 	type="password"
						placeholder="Password"
						className='border-2 border-black px-1 rounded w-auto focus:outline-none'
						value={password}
						autoComplete='Password'
						onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" className='border-2 border-black font-bold rounded px-2 hover:shadow-lg m-2 hover:bg-black hover:text-white'>Sign in</button>
			</form>
			{loginError && 
			(
				<p className="text-red-600 font-semibold text-center my-2"> {loginError} </p>
			)}
			<p>Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link></p>
			<p>Forgot your password? <Link to="/restore_password" className="text-blue-600 hover:underline">Reset Password</Link></p>
			</div>
		</div>
  	);
}

export default Login;