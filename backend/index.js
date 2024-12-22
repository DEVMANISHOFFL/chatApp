// const express = require("express");
import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/datebase.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js"
dotenv.config({});
import cookieParser from "cookie-parser";


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());

//middleware
app.use(express.json());

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute)


app.listen(PORT, () => {
    connectDB();
    console.log(`Server listening to port ${PORT}`);
});