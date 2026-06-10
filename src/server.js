import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
import { connectDB } from "./db/dbConfig.js";
import userRoute from "./route/userRoute.js";
import productRoute from "./route/productRoute.js";
import cors from "cors";

const app = express();
dotenv.config();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
