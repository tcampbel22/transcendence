import autoprefixer from "autoprefixer"

type Loss = {
	losses: number
}

const Losses = ({losses}: Loss) => {
	return (
		<div className="bg-beige rounded items-center border border-white shadow-md pt-4 pb-20 px-2 flex flex-col justify-start">
				<h1 className="text-black font-bold text-2xl mb-2">Losses</h1>
				<p className="text-9xl font-semibold text-red-500 m-10 p-7">{losses}</p>
		</div>
	)
}

export default Losses