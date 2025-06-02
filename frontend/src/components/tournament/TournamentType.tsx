import { Card } from "../utils/Card";
import { TitleCard } from "../utils/TitleCard";
import { useLocation } from "react-router-dom";
import useAllUsers from "../../hooks/useAllUsers";


const TournamentType = () => {
	const location = useLocation();
  	const userInfo = location.state as { userId: number; username: string };
	const eightPlayersToggle = useAllUsers().length > 7;
	console.log(userInfo);
	return (
        <div className="flex flex-col items-center justify-start w-full min-h-screen pt-16 px-4">
			<TitleCard image="/images/tournament-welcome.webp"/>
			<div className="flex flex-col sm:flex-row items-center justify-center gap-6">
				<Card image="/images/4_players.webp" link="/play/tournament-setup" data={{
					tournamentType: 4, 
					userId: userInfo.userId,
					username: userInfo.username
					}} />
				{ eightPlayersToggle ? 
					<Card image="/images/8_players.webp" link="/play/tournament-setup" data={{
						tournamentType: 8,
						userId: userInfo.userId,
						username: userInfo.username
						}} /> :
					<Card image="/images/no8Players.webp"/> 
				}
			</div>
		</div>
	)
};

export default TournamentType