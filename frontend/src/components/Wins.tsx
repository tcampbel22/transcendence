


type Win = {
	victories: number
}


const Wins = ({victories} : Win) => {
	return (
		<div className="bg-black col-span-1">
				<h1 className="text-white">victories</h1>
				<p className="text-7xl font-semibold text-green-400 m-10 p-7">{victories}</p>
		</div>
	)
}

export default Wins