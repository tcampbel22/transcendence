import React from "react";
import { TitleProps } from "../../types/types";
import { Link } from "react-router-dom";

const TitleCard: React.FC<TitleProps> = ({ image, link }) => {
	return link ? (
		<div>
			<div className="w-150 h-75">
				<Link 
					to="/hub"
					className="flex basis-xl md:basis-2xl w-full h-full mx-4 bg-contain bg-no-repeat bg-center "
					title="Back to hub"
					style={{ backgroundImage: `url("/images/pong_12.svg")`}}>
				</Link>
			</div>
		</div>
	) : (
		<div className="w-150 h-75">
			<div 
				className="flex basis-xl md:basis-2xl w-full h-full mx-4 bg-contain bg-no-repeat bg-center "
				style={{ backgroundImage: `url("/images/pong_12.svg")`}}>
			</div>
		</div>)
}

export { TitleCard }