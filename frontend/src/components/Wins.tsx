


type Win = {
	victories: number
}


const Wins = ({victories} : Win) => {
	return (
		<div className="gap-2 mb-8 p-4">
			<div 	className="text-white text-center p-6 rounded-lg h-80 shadow-md bg-contain bg-center"
					style={{
						backgroundImage:'url(images/victory.png)',
					}}
			>
				<p className="text-7xl font-semibold text-green-400 m-10 p-7">{victories}</p>
			</div>
		</div>
	)
}

export default Wins