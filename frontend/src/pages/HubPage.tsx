import React from "react"
import { Link, useLocation } from "react-router-dom";
import { userIdFromState } from "../hooks/userIdFromState";
import { userNameFromState } from "../hooks/useNameFromState";
import FriendsButton from "../components/friends/FriendsButton";
import AddFriendButton from "../components/friends/AddFriendButton"


const Hub = () => {
	const location = useLocation();
  	const userInfo = location.state as { userId: number; username: string };
    const userId = userIdFromState() as number;
	console.log("userid is:", userId);
	const baseCardClass = "w-60 h-72 bg-cover bg-center rounded-lg shadow-lg p-1 transform hover:scale-110 transition-all duration-300 ease-in-out relative hover:shadow-xl hover:rotate-1";
    
	
	
	return (
        <div 
        >
         <h1 className="items-center text-white text-4xl font-bold animate-fade-in">Welcome</h1>
        <div className="absolute top-5 right-10">
                <AddFriendButton userId={userInfo.userId}/>
                <FriendsButton userId={userInfo.userId}/>
        </div>
            <div className="flex  min-h-screen sm:flex-row items-center justify-center gap-6 animate-slide-in">

                <div    className={baseCardClass} //1v1
                        style={{
                            backgroundImage: `url("/images/1v1_2.png")`,
                        }}
                    >
                    <Link 
                        to="/play/1v1"
						state={userInfo} 
                        className="w-full h-full flex items-center justify-center backdrop-brightness-50 rounded-lg">    
                    </Link>
                </div>

                <div className={baseCardClass} //tournamenet
                        style={{
                            backgroundImage: `url("/images/tournament.png")`,
                        }}
                    >
                    <Link 
                        to="/play/tournament"
						state={userId} 
                        className="w-full h-full flex items-center justify-center backdrop-brightness-50 rounded-lg">
                    </Link>
                </div>

                <div className={baseCardClass} //profile
                        style={{
                            backgroundImage: `url("/images/new_profile.png")`,
                        }}
                    >
                    <Link 
                        to="/profile"
						state={userId}
                        className="w-full h-full flex items-center justify-center backdrop-brightness-50 rounded-lg">
						   
                    </Link>
                </div>
                
                <div className={baseCardClass} //logout
                        style={{
                            backgroundImage: `url("/images/logout.png")`,
                        }}
                    >
                    <Link 
                        to="/logout" 
						state={userId}
                        className="w-full h-full flex items-center justify-center backdrop-brightness-50 rounded-lg">    
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hub