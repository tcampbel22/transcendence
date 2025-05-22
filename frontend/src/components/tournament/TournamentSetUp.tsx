import React, { useState } from "react";
import { Link } from 'react-router-dom';

const TournamentSetup = () => {
	
	return (
        <div className="tournament-container">
			<div className="tournament-title-container">
				<div 
					className={"title-card-class "}
					style={{ backgroundImage: `url("/images/tournament-welcome.webp")` }}>
				</div>
			</div>
			<div className="tournament-cards-container">
				 <div className={"base-card-class"}
					style={{ backgroundImage: `url("/images/4_players.webp")` }}>
					<Link 
						to="/play/tournament"
						// state={userInfo} 
						className="w-full h-full flex items-center justify-center backdrop-brightness-50 rounded-lg">    
					</Link>
				</div>
				<div className={"base-card-class"}
					style={{ backgroundImage: `url("/images/8_players.webp")` }}>
					<Link 
						to="/play/tournament"
						// state={userInfo} 
						className="w-full h-full flex items-center justify-center backdrop-brightness-50 rounded-lg">    
					</Link>
				</div>
			</div>
		</div>
	)
};

export default TournamentSetup