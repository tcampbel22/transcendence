/*import { authenticator } from 'otplib';

export const  generateSecret = () => authenticator.generateSecret();

export const generateOTP = (secret) => authenticator.generate(secret);

export const verifyOTP = (otp, secret) => authenticator.verify({ token: otp, secret });*/


import jwt from "jsonwebtoken";

const SECRET_KEY = "supersecretkey"; // Clave secreta para firmar el token

// Generar un JWT con el OTP y expiración de 5 minutos
export const generateOTPToken = (otp) => {
    return jwt.sign({ otp }, SECRET_KEY, { expiresIn: "5m" });
};

// Verificar si el token es válido y si el OTP enviado por el usuario es correcto
export const verifyOTPToken = (token, userOtp) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded.otp === userOtp;
    } catch (error) {
        return false; // Token inválido o expirado
    }
};