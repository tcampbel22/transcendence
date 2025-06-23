import autoprefixer from "autoprefixer"

type Loss = {
	losses: number
}

const Losses = ({losses}: Loss) => {
	return (
		<div className="bg-beige col-span-1 rounded items-center border border-white shadow-md py-2 px-2 max-h-72 overflow-auto">
				<h1 className="text-black font-bold text-2xl mb-2">losses</h1>
				<p className="text-7xl font-semibold text-red-500 m-10 p-7">{losses}</p>
		</div>
	)
}

export default Losses