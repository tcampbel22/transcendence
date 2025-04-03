import { Link} from "react-router-dom";


const Button = () => {
	const buttons = ["1v1", "Tournament"]

	return (
		<div className="flex flex-col justify-center items-center gap-4 min-h-screen">
			<p className="font-semibold text-1xl m-4 animate-fade-in text-3xl">Choose if you want to play 1v1 or tournament</p>
			{buttons.map((label, i) => (
  				<Link to={`/play/${label}`} key={i}>
    				<button className="border-2 border-black font-bold rounded px-2 hover:shadow-lg m-2 animate-fade-in text-2xl">
     			 		{label}
   					 </button>
  				</Link>
			))}
		</div>
	)
}

export default Button;