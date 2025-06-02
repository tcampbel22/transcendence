import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.FASTIFY_SECURE_SECRET;

export const generateOTPToken = (otp) => {
    return jwt.sign({ otp }, SECRET_KEY, { expiresIn: "5m" });
};

export const verifyOTPToken = (token, userOtp) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded.otp === userOtp;
    } catch (error) {
        return false;
    }
};