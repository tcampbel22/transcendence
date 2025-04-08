import React from "react"
import { Link } from "react-router-dom";


const Hub = () => {
    const baseCardClass = "w-60 h-72 bg-cover bg-center rounded-lg shadow-lg p-1 transform hover:scale-110 transition-all duration-300 ease-in-out relative hover:shadow-xl hover:rotate-1";
    return (
        <div style={{
                    backgroundImage: 'url("/images/epic_background.png")',
                }}
        >
         <h1 className="items-center text-white text-4xl font-bold animate-fade-in">Welcome</h1>
            <div className="flex  min-h-screen sm:flex-row items-center justify-center gap-6 animate-slide-in">

                <div    className={baseCardClass} //1v1
                        style={{
                            backgroundImage: `url("/images/1v1_2.png")`,
                        }}
                    >
                    <Link 
                        to="/play/1v1" 
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
                        className="w-full h-full flex items-center justify-center backdrop-brightness-50 rounded-lg">
                    </Link>
                </div>

                <div className={baseCardClass} //profile
                        style={{
                            backgroundImage: `url("/images/happy_profile.png")`,
                        }}
                    >
                    <Link 
                        to="/profile" 
                        className="w-full h-full flex items-center justify-center backdrop-brightness-50 rounded-lg">     
                    </Link>
                </div>
                
                <div className={baseCardClass} //settings/logout
                        style={{
                            backgroundImage: `url("/images/settings.png")`,
                        }}
                    >
                    <Link 
                        to="/settings" 
                        className="w-full h-full flex items-center justify-center backdrop-brightness-50 rounded-lg">    
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hub