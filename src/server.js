import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
dns.setServers(['8.8.8.8']);
import { connectDB } from "./db/dbConfig.js";


const app = express();
dotenv.config();

// mongoose.connect(process.env.MONGO_URL)
// .then(()=>console.log("connected"))
// .catch((e)=>console.log("error ocured",e))

connectDB();

app.get("/",(req,res)=>{
    res.send("hellow");
});

app.listen(3000,()=>{
    console.log("running on 3000")
})