import { Link } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [loginError, setLoginError] = useState('');
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		console.log("uname:", username)
		console.log("pword:", password)

		const loginInput = {
			username,
			password,
		}
		try {
			// const response = await axios.post("/api/login", loginInput)

			// console.log("logged in succesfully", response.data)
		} catch (error: any) {
			console.error("Error:", error.response?.data || error.message);
			setLoginError(error.response?.data?.message || "invalid username or password")
			return;
		}
		setPassword('')
		setUsername('')
		console.log("great success, lets play the game")
		navigate('/mainpage')
	}

  	return (
		<div>
		<h1 className='font-bold text-3xl m-5'>Login</h1>
		<form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
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
			<button type="submit" className='border-2 border-black font-bold rounded px-2 hover:shadow-lg m-2'>Sign in</button>
		</form>
		{loginError && 
		(
			<p className="text-red-600 font-semibold text-center my-2"> {loginError} </p>
		)}
		<p>Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link></p>
		<p>Forgot your password? <Link to="/restore_password" className="text-blue-600 hover:underline">Reset Password</Link></p>
		</div>
  	);
}

export default Login;