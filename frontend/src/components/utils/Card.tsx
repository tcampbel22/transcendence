import { Link } from "react-router-dom";
import React from "react";
import { CardProps } from "../../types/types";

const Card: React.FC<CardProps> = ({ image, link, data }) => {
	const linkToggle = link === undefined;
	return (
			<div
				className="w-60 h-72 bg-cover bg-center rounded-lg shadow-lg p-1 transform hover:scale-110 transition-all duration-300 ease-in-out relative hover:shadow-xl hover:rotate-1"
				style={{ backgroundImage: `url(${image})`}}>
				{linkToggle ? 
					<div className="w-full h-full flex items-center justify-center backdrop-brightness-50 rounded-lg"></div> : 
					<Link
						to={link}
						state={data}
						className="w-full h-full flex items-center justify-center backdrop-brightness-50 rounded-lg"
						>
					</Link>}

			</div>
	)
}

export { Card }