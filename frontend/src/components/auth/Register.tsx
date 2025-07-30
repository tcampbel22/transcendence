import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../lib/api'
import { TitleCard } from '../utils/TitleCard';
import { AuthInput } from '../utils/AuthInput';





const Register:React.FC = () => {
	const API_URL = import.meta.env.VITE_API_USER;
	const [username, setUsername] = useState('')
  	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [registered, setRegistered] = useState(false)
	const [error, setError] = useState('')
	const navigate = useNavigate();

	const registerUser = async () => {

		const payload = {
			username,
			email,
			password,
		};
		try {
			const response = await api.post(`${API_URL}/register`, payload, {withCredentials: true}) //product
			return response.data.id
		} catch (error: any) {
			// console.error(error.message)
			// console.error("Error:", error.response?.data || error.message);
			// setError()
			throw new Error(error);
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setTimeout(() => {
			setError('');
		  }, 3000);
		const payload = {
			username,
			email,
			password,
		};
		try {
			if (!username || !password || !email) {
				setError("Missing field: all fields are required")
				return
			}
			const response = await api.post(`${API_URL}/register`, payload, {withCredentials: true}) //product
			setRegistered(true);
			setTimeout(() => {
				navigate('/');
			}, 1000);
			return response.data.id
		} catch (error: any) {
			if (error.response?.data?.message.includes('password must match'))
				setError("password must contain 1 number and 1 uppercase letter")
			else if (error.response?.data?.message.includes('username must match'))
				setError("username cannot contain special characters")
			else if (error.response?.data?.message.includes('username must NOT'))
				setError("username must between 3 & 15 characters")
			else if (error.response?.data?.message.includes('password must NOT'))
				setError("password must be at least 5 characters")
			else
			setError("Registration failed")
			console.error("Error:", error.response?.data || error.message);
		}
	}

	return (
	<div className="flex flex-col justify-center items-center gap-4">
      	<TitleCard link={false} />
		<div className='basis-md p-10 rounded text-xl border-2 border-amber-200 flex flex-col items-center'>
			<h2 className="text-3xl mb-5 items-center text-center animate-fade-in delay-400 font-bold">Register</h2>
			<div className='animate-slide-in'>
				<form className="flex flex-col items-center gap-4 mb-6" onSubmit={handleSubmit}>
					<AuthInput type="text" placeholder='username...' auto="new-email" value={username} setValue={setUsername}/>
					<AuthInput type="email" placeholder='email@example.com' auto="new-email" value={email} setValue={setEmail}/>
					<AuthInput type="password" placeholder='password...' auto="new-password" value={password} setValue={setPassword}/>
					<button  type="submit" className='border border-amber-200 rounded px-3 py-1 my-3 hover:bg-amber-200 hover:text-gray-900'>Register</button>
					{error && 
					(
						<p className="text-red-400 font-semibold text-center my-2"> {error} </p>
					)}
					{registered && (
						<p className="transition-opacity duration-300 opacity-100 text-green-400 font-semibold mt-4 animate-slide-in">
								✅ Registration successful! You can now log in. ✅
						</p>
					)}
					<p>
						Already have an account?{" "}
						<Link to="/" className="text-blue-600 hover:underline">
							Login
						</Link>
					</p>
			</form>
		</div>
	</div>
	</div>
  );
}

export default Register