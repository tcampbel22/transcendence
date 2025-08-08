import { TitleCard } from "./TitleCard"


export const Error = ({errCode = 500}) => {
	return (
		<div className="flex flex-col gap-8 items-center justify-center">
			<TitleCard link={false}/>
			<span className="text-8xl font-bold">{errCode}</span>
			<span>
				Something very bad happened, please try again later...
			</span>
		</div>

	)
}