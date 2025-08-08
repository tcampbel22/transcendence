import React from "react"
import { TitleCard } from "./TitleCard"

export const Loading:React.FC = () => {
	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center">
			 <svg className="mr-3 size-10 animate-spin ..." viewBox="0 0 24 24">  </svg>
			<TitleCard link={false} />
			<span>I'm cheap so please wait for the servers to spin up...</span>
		</div>
	)
}