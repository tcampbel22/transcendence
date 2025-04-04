import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
	const [username, setUsername] = useState('')
  	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [registered, setRegistered] = useState(false)
	const [image, setImage] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)
	const navigate = useNavigate();

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

		const response = await axios.post('/api/register', payload)
		return response.data.userId
	}

	const uploadProfileImage = async (userId: string) => {
		const formData = new FormData()
		if (!image) return 
		formData.append("image", image)

		try {
			const response = await axios.post('/api/users/userId/image', image) //the post location might change
			console.log("Profile image uploaded:", response.data);
			
		} catch (error: any) {
			console.error("Image upload failed:", error.response?.data || error.message);
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		
		try {
			const userId = await registerUser()
			
			if (image) {
				uploadProfileImage(userId)
			}
		
			setRegistered(true);
			setTimeout(() => {
			  navigate('/');
			}, 1500);
		} catch (error: any) {
			// console.error("Error:", error.response?.data || error.message);
			navigate('/');
		}
	}

	return (
	<div className="flex flex-col justify-center items-center gap-4 min-h-screen">
		<h1 className="text-3xl m-1 items-center opacity-0 animate-fade-in delay-700 font-semibold">Register</h1>
		<div className='animate-slide-in'>
			<form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
				<input 	type="text"
						placeholder="username"
						autoComplete="new-username"
						className='border-2 border-black px-1 rounded w-auto focus:outline-none'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
				/>
				<input 	type="email"
						placeholder="email@example.com"
						autoComplete="new-email"
						className='border-2 border-black px-1 rounded w-auto focus:outline-none'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
				/>
				<input 	type="password"
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
				{registered && (
					<p className="transition-opacity duration-600 opacity-100 text-black font-semibold mt-4">
							✅ Registration successful! You can now log in. ✅
					</p>
	)}
			</form>
		</div>
	</div>
  );
}

export default Register