type Win = {
	victories: number
}


const Wins = ({victories} : Win) => {
	return (
		<div className="bg-beige col-span-1 rounded items-center border border-white shadow-md">
				<h1 className="text-black font-bold text-2xl">victories</h1>
				<p className="text-7xl font-semibold text-green-400 m-10 p-7 items-center">{victories}</p>
		</div>
	)
}

export default Wins;