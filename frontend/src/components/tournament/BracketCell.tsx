import React from "react";
import MatchBox from "./MatchBox";
import { HoriLine, ShortHoriLine, ShortVertLine, VertLine } from "./TournamentBracketUtils";
import { StartTournamentGameProps } from "./TournamentControls";

type BreacketCellProps = {
	p1Id: number | "TBD";
	p2Id: number | "TBD";
	winner: number | "TBD";
	hasPlayed: boolean;
	index?: number;
	stage: string;
	xDir: string;
	yDir: string;
	tType: number;
	setData: (data: StartTournamentGameProps) => void;
}

export const BracketCell:React.FC<BreacketCellProps> = ({ 
	p1Id, p2Id, winner, hasPlayed, index, stage, xDir, yDir, setData, tType }) => {
	return (
		<div className={`flex items-start justify-center relative`}>
				{stage === 'semifinal' && tType === 8 ? (<ShortHoriLine xDir="" yDir="" hasPlayed={hasPlayed}/>) : null}
				{stage === 'semifinal' && tType === 4 ? (<HoriLine xDir="left" yDir="" hasPlayed={hasPlayed}/>) : null}
				{stage === 'semifinal' && tType === 4 ? (<VertLine xDir={xDir} yDir={yDir} hasPlayed={hasPlayed}/>) : null}
                {stage === 'final' && tType === 8 ? (<ShortHoriLine xDir="" yDir="" hasPlayed={hasPlayed}/>) : null}
                {stage === 'final' && tType === 4 ? (<HoriLine xDir="" yDir="" hasPlayed={hasPlayed}/>) : null}
				{stage !== 'final' && tType === 8 ? (
					<>
						<ShortHoriLine xDir="left" yDir="" hasPlayed={hasPlayed} />
						{index === 0 || index === 3 || stage === 'semifinal' ? (
						<VertLine xDir="left" yDir={yDir} hasPlayed={hasPlayed} />
						) : (null)}
					</>
					) : (null)}
				<MatchBox
                  playerA={p1Id}
                  playerB={p2Id}
                  winner={winner}
                  hasPlayed={hasPlayed}
                  onClick={() => {
                    setData({
                        p1UserId: p1Id,
                        p2UserId: p2Id,
                        matchIndex: index!,
                        stage: stage,
                    });
                  }}
                />
        </div>
	)
}