
import { Routes, Route } from "react-router-dom"
import Register from "./Register"
import OneVsOnePage from "../pages/OneVsOnePage"
import TournamentPage from "../pages/TournamentPage"
import Login from "./Login"
import ButtonGroup from "./ButtonGroup"

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={
			<div className="flex flex-col justify-center min-h-screen animate-fade-in">
				<h1 className="font-bold text-5xl">Welcome to Pong</h1>
				<Login />
			</div>
	  	}/>
		<Route path="/register" element={<Register />} />
		<Route path="/play/1v1" element={<OneVsOnePage />} />
		<Route path="/play/Tournament" element={<TournamentPage />} />
		<Route path='/mainpage' element={<ButtonGroup />} />
	</Routes>
)

export default AppRoutes