import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
import cors from "cors";
dns.setServers(['8.8.8.8']);
import { connectDB } from "./db/dbConfig.js";
import userRouter from "./route/userRoute.js";
import productRouter from "./route/productRoute.js";


const app = express();
dotenv.config();

// mongoose.connect(process.env.MONGO_URL)
// .then(()=>console.log("connected"))
// .catch((e)=>console.log("error ocured",e))

connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);


app.get("/",(req,res)=>{
    res.send("hellow");
});

app.listen(3000,()=>{
    console.log("running on 3000")
})