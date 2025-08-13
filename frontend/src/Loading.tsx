import React from "react"
import { TitleCard } from "./components/utils/TitleCard"

export const Loading:React.FC = () => {
	return (
		<div className="w-screen flex flex-col gap-10 items-center justify-center text-2xl font bold">
			<TitleCard link={false} />
			<span>I'm cheap so please wait for the servers to spin up...</span>
			<div className="mt-10 inline-block h-24 w-24 animate-spin rounded-full border-10 border-solid border-amber-200 border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
		</div>
	)
}