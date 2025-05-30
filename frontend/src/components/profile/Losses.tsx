import autoprefixer from "autoprefixer"

type Loss = {
	losses: number
}

const Losses = ({losses}: Loss) => {
	return (
		<div 	className="bg-beige-400 col-span-1 rounded items-center border border-white shadow-md">
				<h1 className="text-black font-bold text-2xl">losses</h1>
				<p className="text-7xl font-semibold text-red-500 m-10 p-7">{losses}</p>
		</div>
	)
}

export default Losses