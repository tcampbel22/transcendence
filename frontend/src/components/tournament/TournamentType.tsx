import { Card } from "../utils/Card";
import { TitleCard } from "../utils/TitleCard";
import { useState } from "react";

const TournamentType = () => {
	return (
        <div className="flex flex-col items-center justify-start w-full min-h-screen pt-16 px-4">
			<TitleCard image="/images/tournament-welcome.webp"/>
			<div className="flex flex-col sm:flex-row items-center justify-center gap-6">
				<Card image="/images/4_players.webp" link="/play/tournament-setup" data={{tournamentType: 4}} />
				<Card image="/images/8_players.webp" link="/play/tournament-setup" data={{tournamentType: 8}} />
			</div>
		</div>
	)
};

export default TournamentType