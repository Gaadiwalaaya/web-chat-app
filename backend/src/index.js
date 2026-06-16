import dotenv from "dotenv";
dotenv.config();


import express from "express";
const app = express();
app.use(express.json());

import cookieParser from "cookie-parser"
app.use(cookieParser())

const PORT = process.env.PORT;

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
app.use("/api/auth", authRoutes);

import messageRoutes from "./routes/message.route.js";
app.use("/api/message", messageRoutes);

app.listen(PORT, ()=> {
    connectDB();
})