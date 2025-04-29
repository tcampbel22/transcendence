
import { Routes, Route } from "react-router-dom"
import Register from "../auth/Register"
import OneVsOnePage from "../../pages/OneVsOnePage"
import TournamentPage from "../../pages/TournamentPage"
import Login from "../auth/Login"
import Hub from "../../pages/HubPage"
import Profile from "../../pages/Profile"

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<Login />}/>
		<Route path="/register" element={<Register />} />
		<Route path="/play/1v1" element={<OneVsOnePage />} />
		<Route path="/play/Tournament" element={<TournamentPage />} />
		<Route path='/hub' element={<Hub />}/>
		<Route path='/profile' element={<Profile />} />
	</Routes>
)

export default AppRoutes