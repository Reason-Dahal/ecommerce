import express from "express";
import dotenv from "dotenv";
import dns from "dns";
import cors from "cors";
dns.setServers(['8.8.8.8']);
import { connectDB } from "./db/dbConfig.js";
import userRouter from "./route/userRoute.js";
import productRouter from "./route/productRoute.js";
import orderRouter from "./route/orderRoute.js";


const app = express();
dotenv.config();



connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);


app.get("/",(req,res)=>{
    res.send("hellow");
});

app.listen(3000,()=>{
    console.log("running on 3000")
})