import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendVerificationEmail = async (toEmail, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"ViaBhraman" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Verify your email",
    html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email:</p>
      <a href="http://localhost:5000/api/auth/verify/${token}">Verify Email</a>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("📨 Email sent to:", toEmail);
};
