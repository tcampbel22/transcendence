import React from "react";

type CustomButtonProps = {
  label: string;
  authUrl: string; // URL para la autenticación con Google
  className?: string; // Permite personalizar estilos
};

const CustomButton: React.FC<CustomButtonProps> = ({ label, authUrl, className }) => {
  const handleClick = () => {
    console.log("Redirigiendo a la autenticación con Google...");
    window.location.href = authUrl; // Redirige al usuario a la URL de autenticación
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {label}
    </button>
  );
};

export default CustomButton;