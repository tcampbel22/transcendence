import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
	const [username, setUsername] = useState('')
  	const [password, setPassword] = useState('')
	const [registered, setRegistered] = useState(false)
	const navigate = useNavigate();
	//handles the submit and keeps the webpage unrefreshed - stuff goes eventually to backend.
	//async so we can use await inside it - needed for fetch
	// prevenetDefault keeps the page from doing default action which is refreshing
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		console.log("Form submitted!");
  		console.log("Username:", username);
  		console.log("Password:", password);

		const payload = {
			username,
			password,
		};
		try {
			// const response = await fetch("our backend", {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type':'application/json',
			// 	},
			// 	body: JSON.stringify(payload)
			// });
			const fakeResponse = {
				ok: true,
				json: async () => ({ message: "User registered successfully" }),
			  };
			// if (!response.ok) {
			// 	throw new Error('Registration error')
			// }
			if (!fakeResponse.ok) {
				throw new Error('Registration failed');
			  }

			const data = await fakeResponse.json();
			console.log("Success (FAKE):", data);
			// const data = await response.json()
			// console.log('Success', data)
			setRegistered(true)
			setTimeout(() => { navigate('/') }, 1500 )
		}
		catch (error) {
			console.error('Error:', error);
		}
		setPassword('')
		setUsername('')
	}

	return (
	<div className="flex flex-col items-center gap-4 bg-gradient-moving bg-[length:200%_200%] animate-bg-pan min-h-screen">
		<h1 className="text-3xl m-1 items-center opacity-0 animate-fade-in delay-700">Register</h1>
		<div className='animate-slide-in'>
			<form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
				<input 	type="text"
						placeholder="Username"
						autoComplete="new-username"
						className='border-2 border-black px-1 rounded w-auto focus:outline-none'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
				/>
				<input 	type="password"
						placeholder="Password"
						autoComplete="new-password"
						className='border-2 border-black px-1 rounded w-auto focus:outline-none'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
				/>
				<button  type="submit" className='border-2 border-black rounded px-1 hover:shadow-lg '>Register</button>
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