import React, { useState }  from "react";
import AppRoutes from "./components/routes/AppRoutes";

const App: React.FC = () => {
  

    return (
	<div 	className="min-h-screen text-center"
			style={{
				backgroundImage: 'url("/images/epic_background.png")',
				
			}}
	>
		<AppRoutes />
	</div>
    );
};

export default App;
