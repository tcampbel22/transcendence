import React from "react"
import { Link} from "react-router-dom";

type ButtonGroupProps = {
	buttons: string[]
}


const Button = ({buttons} : ButtonGroupProps) => {
	return (
		<div className="flex flex-col items-center gap-4">
			<p className="font-semibold text-1xl m-4">Choose if you want to play 1v1 or tournament</p>
			{buttons.map((label, i) => (
  				<Link to={`/play/${label}`} key={i}>
    				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-auto">
     			 		{label}
   					 </button>
  				</Link>
			))}
		</div>
	)
}

export default Button;