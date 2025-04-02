
import { Routes, Route } from "react-router-dom"
import Register from "./Register"
import OneVsOnePage from "../pages/OneVsOnePage"
import TournamentPage from "../pages/TournamentPage"
import Login from "./Login"

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={
			<div>
				<h1 className="font-bold text-5xl">Welcome to Pong</h1>
				<Login />
				{/* need to move these some where else, could use navigate(); after a succesfull login */}
				{/* <Button buttons={buttons}/> */}
				{/* <h2>Score: {leftScore} - {rightScore}</h2> */}
				{/* <Pong setLeftScore={setLeftScore} setRightScore={setRightScore} /> */}
			</div>
	  	}/>
		<Route path="/register" element={<Register />} />
		<Route path="/play/1v1" element={<OneVsOnePage />} />
		<Route path="/play/Tournament" element={<TournamentPage />} />
	</Routes>
)

export default AppRoutes