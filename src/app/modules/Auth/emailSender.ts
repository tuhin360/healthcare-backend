import nodemailer from "nodemailer";
import config from "../../../config";

const emailSender = async (email: string, html: string) => {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // host: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    // from: '"PH Health Care" <tuhin153695@gmail.com>',
    from: `"PH Health Care" <${config.emailSender.email}>`,
    to: email,
    subject: "Reset Password Link",
    //   text: "Hello world?", // plain‑text body
    html, // HTML body
  });

  console.log("Message sent:", info.messageId);
};

export default emailSender;
