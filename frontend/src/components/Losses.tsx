import autoprefixer from "autoprefixer"

type Loss = {
	losses: number
}

const Losses = ({losses}: Loss) => {
	return (
		<div 	className="bg-black col-span-1">
				<h1 className="text-white">losses</h1>
				<p className="text-7xl font-semibold text-red-500 m-10 p-7">{losses}</p>
		</div>
	)
}

export default Losses