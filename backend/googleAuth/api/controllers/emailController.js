import sendgridClient from "../config/sendgrid.js";

export const sendEmail = async (request, reply) => {
    const { to, subject, text } = request.body;

    const msg = {
        to,
        from: "deivyla@hotmail.com", // Cambia por tu correo verificado en SendGrid
        subject,
        text,
    };

    try {
        await sendgridClient.send(msg);
        reply.send({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        reply.send({ success: false, error });
    }
};
