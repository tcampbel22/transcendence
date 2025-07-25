import React from "react";
import { TitleProps } from "../../types/types";

const TitleCard: React.FC<TitleProps> = ({ image }) => {
	return (
		<div className="flex items-center justify-center mb-1 overflow-auto">
				<div 
					className="basis-xl md:basis-2xl w-200 h-100 bg-cover bg-center"
					style={{ backgroundImage: `url(${image})`}} >
				</div>
		</div>
	)
}

export { TitleCard }