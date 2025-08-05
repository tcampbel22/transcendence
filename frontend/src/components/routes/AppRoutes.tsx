
import { Routes, Route } from "react-router-dom"
import Register from "../auth/Register"
import OneVsOnePage from "../../pages/OneVsOnePage"
import Login from "../auth/Login"
import Hub from "../../pages/HubPage"
import Profile from "../../pages/Profile"
import OTPInput from "../auth/2FA"
import Logout from "../auth/Logout"
import TournamentType from "../tournament/TournamentType"
import TournamentSetUp from "../tournament/TournamentSetUp"
import TournamentBracket from "../tournament/TournamentBracket"
import TournamentPongWrapper from "../tournament/TournamentWrapper"

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<Login />}/>
		<Route path="/register" element={<Register />} />
		<Route path="/play/1v1" element={<OneVsOnePage />} />
		<Route path="/play/tournament" element={<TournamentType />} />
		<Route path="/play/tournament-setup" element={<TournamentSetUp />} />
		<Route path="/play/tournament-bracket" element={<TournamentBracket />} />
		<Route path="/play/1v1/tournament" element={<TournamentPongWrapper />} />
		<Route path='/hub' element={<Hub />}/>
		<Route path='/profile' element={<Profile />} />
		<Route path='/2fa' element={<OTPInput />} />
		<Route path="/logout" element={<Logout />} />
	</Routes>
)

export default AppRoutes