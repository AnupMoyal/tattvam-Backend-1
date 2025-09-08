import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.js";
import contactRoutes from "./src/routes/contact.routes.js";
import chatRoutes from "./src/routes/chatRoutes.js";

import path from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api", contactRoutes);
app.use("/api", chatRoutes);


// ✅ Serve uploaded images (local Multer uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Connect DB and start server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("🙏 Jai Shree Ram");
  console.log("🙏 Jai Mata Di");
  console.log("🙏 Jai Mata Di");
});
