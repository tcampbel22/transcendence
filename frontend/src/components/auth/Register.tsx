import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'


const Register = () => {
	const API_URL = import.meta.env.VITE_API_USER;
	const [username, setUsername] = useState('')
  	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [registered, setRegistered] = useState(false)
	const [loginError, setError] = useState('')
	const navigate = useNavigate();

	const registerUser = async () => {

		const payload = {
			username,
			email,
			password,
		};

		const response = await api.post(`${API_URL}/register`, payload, {withCredentials: true}) //product
		return response.data.id
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		try {
			await registerUser();
			setRegistered(true);
			setTimeout(() => {
			  navigate('/');
			}, 1500);
		} catch (error: any) {
			setError(error.response?.data?.message || 'Registration failed')
		}
	}

	return (
	<div className="flex flex-col justify-center items-center gap-4 min-h-screen">
		<div className='bg-beige p-10 rounded border-2 border-black'>
		<h1 className="text-3xl m-5 items-center opacity-0 animate-fade-in delay-700 font-semibold">Register</h1>
		<div className='animate-slide-in'>
			<form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
				<input 	type="text"
						required
						placeholder="username"
						autoComplete="new-username"
						className='border-2 border-black px-1 rounded w-auto focus:outline-none'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
				/>
				<input 	type="email"
						required
						placeholder="email@example.com"
						autoComplete="new-email"
						className='border-2 border-black px-1 rounded w-auto focus:outline-none'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
				/>
				<input 	type="password"
						required
						placeholder="password"
						autoComplete="new-password"
						className='border-2 border-black px-1 rounded w-auto focus:outline-none'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
				/>
				<button  type="submit" className='border-2 border-black font-bold rounded px-1 hover:shadow-lg '>Register</button>
				{loginError && 
			(
				<p className="text-red-600 font-semibold text-center my-2"> {loginError} </p>
			)}
				{registered && (
					<p className="transition-opacity duration-600 opacity-100 text-black font-semibold mt-4 animate-slide-in">
							✅ Registration successful! You can now log in. ✅
					</p>
	)}
			</form>
		</div>
	</div>
	</div>
  );
}

export default Register