import React from "react"
import { Link } from "react-router-dom";


const Hub = () => {
    return (
        <div className="">
         <h1 className="items-center text-4xl font-bold animate-fade-in">Welcome</h1>
            <div className="flex  min-h-screen sm:flex-row items-center justify-center gap-6 animate-slide-in">
                <div    className="w-64 h-80 bg-cover bg-center rounded-lg shadow-lg p-1 hover:scale-105 transition relative"
                        style={{
                            backgroundImage: `url("https://tse3.mm.bing.net/th?id=OIP.hoJXUuebo-w3GKdlGCo_owHaDk&pid=Api")`  // 👈 your image path here
                        }}
                    >
                    <Link 
                        to="/play/1v1" 
                        className="w-full h-full flex items-center justify-center text-xl font-bold text-white backdrop-brightness-50 rounded-lg">1v1</Link>
                </div>
                <div className="w-64 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-md p-1 hover:scale-105 transition">
                    <Link 
                        to="/tournament" 
                        className="flex w-full h-full text-center text-xl font-semibold text-white items-center justify-center">Tournament</Link>
                </div>
                <div className="w-64 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-md p-1 hover:scale-105 transition">
                    <Link 
                        to="/profile" 
                        className="flex w-full h-full text-center text-xl font-semibold text-white items-center justify-center">Profile</Link>
                </div>
                <div className="w-64 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-md p-1 hover:scale-105 transition">
                    <Link 
                        to="/settings" 
                        className="flex w-full h-full text-center text-xl font-semibold text-white items-center justify-center">Settings</Link>
                </div>
            </div>
        </div>
    );
};

export default Hub