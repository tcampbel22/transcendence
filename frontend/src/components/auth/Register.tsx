import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ContainerWithChildren } from 'postcss/lib/container';

const Register = () => {
	//const API_URL = import.meta.env.VITE_API_USER;
	const [username, setUsername] = useState('')
  	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [registered, setRegistered] = useState(false)
	const [image, setImage] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)
	const [loginError, setError] = useState('')
	const navigate = useNavigate();
	//const API_URL = "http://localhost:3002/api"
	const API_URL = "https://localhost:4433/users";

	const registerUser = async () => {

		console.log("user registered!");
		console.log("Username:", username);
		console.log("Password:", password);
		console.log("email:", email);

		const payload = {
			username,
			email,
			password,
		};

		const response = await axios.post(`${API_URL}/register`, payload, {withCredentials: true}) //product
		return response.data
	}

	const uploadProfileImage = async (userId: number) => {
		// Don't proceed if no image selected
		if (!image) return;
		
		// Create proper FormData
		const formData = new FormData();
		formData.append("picture", image); // Change field name to 'picture' to match backend
		
		try {
			// Send FormData, not the raw image
			const response = await axios.put(
				`${API_URL}/${userId}/picture`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data', // Important!
					},
					withCredentials: true // Include credentials
				}
		);
			console.log("Profile image uploaded:", response.data);
		} catch (error: any) {
			console.error("Image upload failed:", error.response?.data || error.message);
		}
	}
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		
		try {
			const { id: userId } = await registerUser();
			console.log(userId);
			if (image) {
				uploadProfileImage(userId)
			}
		
			setRegistered(true);
			setTimeout(() => {
			  navigate('/');
			}, 1500);
		} catch (error: any) {
			console.error("Error:", error.response?.data || error.message);
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
				{preview && (
					<div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
						<img
							src={preview}
							alt="Profile Preview"
							className="w-full h-full object-cover"
						/>
					</div>
				)}
				<input 	type="file"
						accept='image/*'
						onChange={(e) => {const file = e.target.files?.[0]
							if (file) {
								setImage(file)
								setPreview(URL.createObjectURL(file))
							}
						}}
						className=''
						
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