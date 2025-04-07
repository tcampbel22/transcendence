import autoprefixer from "autoprefixer"

type Loss = {
	losses: number
}

const Losses = ({losses}: Loss) => {
	return (
		<div 	className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-4">
			<div 	className="text-white text-center p-4 rounded-lg shadow-md h-80 bg-cover bg-center"
					style={{
						backgroundImage:'url(images/Loss.png)',
					}}
			>
				<p className="text-7xl font-semibold text-red-500 m-10 p-7">{losses}</p>
			</div>
		</div>
	)
}

export default Losses