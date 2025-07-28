import { Link } from "react-router-dom";
import React from "react";
import { CardProps } from "../../types/types";

const Card: React.FC<CardProps> = ({ image, link, data, text }) => {
	const linkToggle = link === undefined;
	return (
			<div
				className="flex flex-col items-center justify-between py-10 w-60 h-72 bg-contain bg-no-repeat border-4 bg-center rounded transform hover:scale-110 transition-all duration-300 ease-in-out relative hover:shadow-xl hover:rotate-1"
				style={{ backgroundImage: `url(${image})`}}>
				{linkToggle ? 
					<div className="">
						<p className="text-3xl ">{text}</p>
					</div> : 
					<Link
						to={link}
						state={data}
						className=""
						>
						<p className="text-3xl ">{text}</p>
					</Link>}

			</div>
	)
}

export { Card }