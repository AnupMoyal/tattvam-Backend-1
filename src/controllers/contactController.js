import Contact from "../models/contact.model.js";
import nodemailer from "nodemailer";

export const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 1. Save to DB
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    // 2. Send Email Notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,     // your gmail
        pass: process.env.SMTP_PASSWORD   // app password
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      subject: "New Contact Message",
      html: `
        <h3>New Contact Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact form error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
