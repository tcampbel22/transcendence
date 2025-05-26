import sendgridClient from "../config/sendgrid.js";
import { generateOTPToken, verifyOTPToken } from "../service/otpService.js";
import crypto from "crypto";

export const sendEmail = async (request, reply) => {
    console.log("Sending email... ", request.body);
    const { to } = request.body;

    const otp = crypto.randomInt(100000, 999999).toString();

    const otpToken = generateOTPToken(otp);

    const msg = {
        to,
        from: process.env.THE_BOYS,
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
    const { otp, otpToken } = request.body;

    console.log("body:", request.body);

    const isValid = verifyOTPToken(otpToken, otp);

    if (isValid) {
        reply.send({ success: true, message: "OTP verified successfully!" });
    } else {
        reply.send({ success: false, message: "Invalid or expired OTP!" });
    }
};