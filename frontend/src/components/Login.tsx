import { Link } from 'react-router-dom';

const Login = () => {
  return (
	<div>
	  <h1 className='font-bold text-3xl m-5'>Login</h1>
	  <form className="flex flex-col items-center gap-4">
		<input type="text" placeholder="Username" className='border border-black px-1 rounded w-auto focus:outline-none'/>
		<input type="text" placeholder="Password" className='border border-black px-1 rounded w-auto focus:outline-none'/>
		<button type="submit" className='font-semi m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-auto'>Sign in</button>
	  </form>
	  <p>Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link></p>
	  <p>Forgot your password? <Link to="/restore_password" className="text-blue-600 hover:underline">Reset Password</Link></p>
	</div>
  );
}

export default Login;