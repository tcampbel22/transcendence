
import { Routes, Route } from "react-router-dom"
import Register from "./Register"
import OneVsOnePage from "../pages/OneVsOnePage"
import TournamentPage from "../pages/TournamentPage"
import Login from "./Login"
import ButtonGroup from "./ButtonGroup"
import Hub from "../pages/HubPage"

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<Login />}/>
		<Route path="/register" element={<Register />} />
		<Route path="/play/1v1" element={<OneVsOnePage />} />
		<Route path="/play/Tournament" element={<TournamentPage />} />
		<Route path='/mainpage' element={<ButtonGroup />} />
		<Route path='/hub' element={<Hub />}/>
	</Routes>
)

export default AppRoutes