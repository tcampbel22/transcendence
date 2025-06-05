import React from "react";
import { TitleProps } from "../../types/types";

const TitleCard: React.FC<TitleProps> = ({ image }) => {
	return (
		<div className="flex flex-col items-center justify-center w-full mb-12">
				<div 
					className="w-full max-w-3xl h-80 mx-auto bg-contain bg-no-repeat bg-center shadow-lg"
					style={{ backgroundImage: `url(${image})`}} >
				</div>
		</div>
	)
}

export { TitleCard }