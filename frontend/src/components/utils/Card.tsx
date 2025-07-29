import { Link } from "react-router-dom";
import React from "react";
import { CardProps } from "../../types/types";

const Card: React.FC<CardProps> = ({ image, link, data, text }) => {
	return (
			<div
				className=" text-center pt-6 w-60 h-72 border-4 rounded 
							transform hover:scale-110 transition-all duration-300 ease-in-out">
					<Link
						style={{ backgroundImage: `url(${image})`}}
						to={link}
						state={data}
						className="flex flex-col justify-between h-full w-full bg-contain bg-no-repeat bg-center"
						>
						<p className="text-3xl ">{text}</p>
					</Link>
			</div>
	)
}

export { Card }