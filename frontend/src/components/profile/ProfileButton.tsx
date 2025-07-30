import React from "react";

type ProfileButtonProps = {
	text: string;
	setValue: () => void;
}

export const ProfileButton:React.FC<ProfileButtonProps> = ({ text, setValue }) => {
	return (
		<button
			onClick={setValue}
			className="w-full py-3 text-lg border rounded hover:bg-amber-200 hover:text-gray-900 hover:scale-105 transition ease-out-300"
			>
				{text}
			</button>
	)
}