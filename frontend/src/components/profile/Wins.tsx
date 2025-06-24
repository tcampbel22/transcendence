type Win = {
	victories: number
}


const Wins = ({victories} : Win) => {
	return (
		<div className="bg-beige rounded items-center border border-white shadow-md pt-4 pb-20 px-2 flex flex-col justify-start">
				<h1 className="text-black font-bold text-2xl mb-2">Victories</h1>
				<p className="text-9xl font-semibold text-green-400 m-10 p-7">{victories}</p>
		</div>
	)
}

export default Wins;