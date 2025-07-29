import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userIdFromState } from "../hooks/userIdFromState";
import { userNameFromState } from "../hooks/useNameFromState";
import FriendsButton from "../components/friends/FriendsButton";
import AddFriendButton from "../components/friends/AddFriendButton";
import { useFriendslist } from "../hooks/useFriendsList";
import { Card } from "../components/utils/Card";
import { TitleCard } from "../components/utils/TitleCard";
import useAllUsers from "../hooks/useAllUsers";
import { useUsername } from "../hooks/useUsername";

interface FullUserInfo {
  userId: number;
  username: string;
  is2faEnabled: boolean;
  // add any other fields you need here
}

const Hub = () => {
	const location = useLocation();
	const navUserInfo = location.state as FullUserInfo | undefined;
	const stored = localStorage.getItem("currentUser");
	const savedUserInfo: FullUserInfo | null = stored ? JSON.parse(stored) : null;
	
	const userInfo: FullUserInfo | null = navUserInfo ?? savedUserInfo;
	useEffect(() => {
		if (navUserInfo) {
			localStorage.setItem("currentUser", JSON.stringify(navUserInfo));
		}
	}, [navUserInfo]);
	if (!userInfo || !userInfo?.userId) {
		return (
			<div className="p-10 text-center text-red-500">
			Could not determine your user info. Please log in again.
		</div>
		);
	}
	
	const name = useUsername(userInfo?.userId).username;

  	const { userId } = userInfo;
	const { friendsList, reFetch } = useFriendslist(userId);
  return (
    <div className="flex flex-col w-full">
      	<div className="flex flex-col lg:flex-row justify-center">
			<TitleCard image={"/images/pong_12.svg"} />
        	<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:absolute lg:right-5 gap-2 py-10">
				<AddFriendButton userId={userInfo.userId} onSuccess={reFetch} />
				<div className="flex flex-col">
					<FriendsButton
					userId={userInfo.userId}
					friendsList={friendsList}
					onSuccess={reFetch}
					/>
				</div>
			</div>
      	</div>
      	<div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-10">
        <Card image="/images/rackets.svg" link={"/play/1v1"} data={userInfo} text="1v1"/>
        <Card
			image="/images/trophy.svg"
			link={"/play/tournament"}
			data={{userId: userInfo.userId, username: name}}
			text="Tournament"
		/>
        <Card
          image="/images/profile.svg"
          link={"/profile"}
          data={userInfo.userId}
		  text="Profile"
        />
        <Card image="/images/door.svg" link={"/logout"} data={userId} text="Logout"/>
      </div>
    </div>
  )
}

export default Hub;
