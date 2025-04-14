import React from "react";
import axios from "axios";

interface CustomButtonProps {
  label: string;
  authUrl: string;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, authUrl, className }) => {
  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get(authUrl, { withCredentials: true });
      console.log("Usuario autenticado:", response.data);

    } catch (error) {
      console.error("Error al autenticar:", error);
    }
  };

  return (
    <button onClick={handleLogin} className={`border-2 border-black font-bold rounded px-2 hover:shadow-lg ${className}`}>
      {label}
    </button>
  );
};

export default CustomButton;

/*import React from "react";

interface CustomButtonProps {
  label: string;
  authUrl: string;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, authUrl, className }) => {
  const handleRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = authUrl; // Redirige al URL proporcionado
  };

  return (
    <button onClick={handleRedirect} className={`border-2 border-black font-bold rounded px-2 hover:shadow-lg ${className}`}>
      {label}
    </button>
  );
};

export default CustomButton;*/