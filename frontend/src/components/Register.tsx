import {useState} from 'react'

const Register = () => {
	const [username, setUsername] = useState('');
  	const [password, setPassword] = useState('');

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
		setPassword('')
		setUsername('')
	}

	return (
	<div className="flex flex-col items-center gap-4 bg-gradient-moving bg-[length:200%_200%] animate-bg-pan min-h-screen">
	  <h1 className="text-3xl m-1 items-center">Register</h1>
	  	<form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
			<input 	type="text"
					placeholder="Username"
					className='border border-black px-1 rounded w-auto focus:outline-none'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
			/>
			<input 	type="password"
					placeholder="Password"
					className='border border-black px-1 rounded w-auto focus:outline-none'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
			/>
			<button  type="submit">Register</button>
		</form>
	</div>
  );
}

export default Register