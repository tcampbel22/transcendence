


type Win = {
	victories: number
}


const Wins = ({victories} : Win) => {
	return (
		<div className="grid grid-cols-4 sm:grid-rows-1 gap-2 p-4">
			<div 	className="text-white text-center p-6 rounded-lg shadow-md h-80 bg-cover "
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