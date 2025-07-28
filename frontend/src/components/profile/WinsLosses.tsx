type WinLoss = {
	value: number
	text: string
	percent: boolean
}

export const WinsLosses = ({value, text, percent} : WinLoss) => {
	return (
		<div className="relative rounded text-center border pt-4 px-2 flex flex-col justify-start items-center h-full w-full overflow-y-scroll">
					<h1 className="font-bold text-2xl">{text}</h1>
				<div className="relative top-10">
					<p className="text-6xl xl:text-9xl font-semibold m-1">{value}{percent ? "%" : ""}</p>
				</div>
		</div>
	)
}
