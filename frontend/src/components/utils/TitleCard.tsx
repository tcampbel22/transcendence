import React from "react";
import { TitleProps } from "../../types/types";

const TitleCard: React.FC<TitleProps> = ({ image }) => {
	return (
		<div className="flex items-center justify-center my-6 mb-6 overflow-auto">
				<div 
					className="basis-xl md:basis-2xl w-150 h-75 mx-4 bg-contain bg-no-repeat bg-center "
					style={{ backgroundImage: `url(${image})`}} >
				</div>
		</div>
	)
}

export { TitleCard }