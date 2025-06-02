import React from "react"
import { useLocation } from "react-router-dom";
import { userIdFromState } from "../hooks/userIdFromState";
import { userNameFromState } from "../hooks/useNameFromState";
import FriendsButton from "../components/friends/FriendsButton";
import AddFriendButton from "../components/friends/AddFriendButton"
import { Card } from "../components/utils/Card";
import { TitleCard } from "../components/utils/TitleCard";
import useAllUsers from "../hooks/useAllUsers";


const Hub = () => {
	const location = useLocation();
  	const userInfo = location.state as { userId: number; username: string };
    const userId = userIdFromState() as number;
	const tournamentToggle = useAllUsers().length < 3;

	return (
        <div className="flex flex-col items-center justify-start w-full min-h-screen pt-16 px-4 overflow-x-hidden">
		<TitleCard image={"/images/welcome.webp"}/>
        <div className="absolute top-5 right-10">
                <AddFriendButton userId={userInfo.userId}/>
                <FriendsButton userId={userInfo.userId}/>
        </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
			<Card image="/images/1v1_2.png" link={"/play/1v1"} data={userInfo}/>
			{tournamentToggle ? <Card image="/images/noTournament.webp"/> : 
				<Card image="/images/tournament.png" link={"/play/tournament"} data={userInfo}/>}
			<Card image="/images/new_profile.png" link={"/profile"} data={userInfo.userId}/>
			<Card image="/images/logout.png" link={"/logout"} data={userId}/>
            </div>
        </div>
    );
};

export default Hub