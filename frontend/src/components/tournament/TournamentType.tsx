import { Card } from "../utils/Card";
import { TitleCard } from "../utils/TitleCard";
import { useLocation } from "react-router-dom";


const TournamentType = () => {
	const location = useLocation();
  	const userInfo = location.state as { userId: number; username: string };
	return (
        <div className="flex flex-col items-center w-full h-full">
			<TitleCard link={true} />
			<div className="text-3xl">
				<p>Select tournament type</p>
			</div>
			<div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
				<Card image="/images/4.svg" link="/play/tournament-setup" text="" data={{
					tournamentType: 4, 
					userId: userInfo.userId,
					username: userInfo.username
					}} />
				<Card image="/images/8.svg" text="" link="/play/tournament-setup" data={{
					tournamentType: 8,
					userId: userInfo.userId,
					username: userInfo.username
					}} /> 
			</div>
		</div>
	)
};

export default TournamentType