import sendgridClient from "../config/sendgrid.js";
import { generateOTPToken, verifyOTPToken } from "../service/otpService.js";
import crypto from "crypto";

export const sendEmail = async (request, reply) => {
    const { to } = request.body;

    // Generar OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Convertir OTP en JWT
    const otpToken = generateOTPToken(otp);

    const msg = {
        to,
        from: "deivyla@hotmail.com", // SendGrid authorized sender
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. Use this code to login to your account. It expires in 5 minutes.`,
    };

    try {
        await sendgridClient.send(msg);
        reply.send({ success: true, message: "Email sent successfully!", token: otpToken });
    } catch (error) {
        console.error("Error sending email:", error);
        reply.send({ success: false, error });
    }
};

export const validateOTP = async (request, reply) => {
    const { otp, token } = request.body;

    // Verifica el token; internamente compara el OTP almacenado en el token con el que envía el usuario
    const isValid = verifyOTPToken(token, otp);

    if (isValid) {
        reply.send({ success: true, message: "OTP válido, autenticación completada!" });
    } else {
        reply.send({ success: false, message: "Código inválido o expirado!" });
    }
};
/*export const validateOTP = async (request, reply) => {
    const { otp, secret } = request.body; // El usuario debe enviar su OTP y su secret almacenado

    const isValid = verifyOTP(otp, secret);

    if (isValid) {
        reply.send({ success: true, message: "Código válido, autenticación completada!" });
    } else {
        reply.send({ success: false, message: "Código inválido o expirado!" });
    }
};*/
