type Win = {
	victories: number
}


const Wins = ({victories} : Win) => {
	return (
		<div className="bg-beige col-span-1 rounded items-center border border-white shadow-md py-2 px-2 max-h-96 overflow-auto">
				<h1 className="text-black font-bold text-2xl mb-1">victories</h1>
				<p className="text-7xl font-semibold text-green-400 m-10 p-7 items-center overflow-auto">{victories}</p>
		</div>
	)
}

export default Wins;