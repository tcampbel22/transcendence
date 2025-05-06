import { MailService } from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

const sendgridClient = new MailService();

sendgridClient.setApiKey(process.env.SENDGRID_API_KEY);

export default sendgridClient;