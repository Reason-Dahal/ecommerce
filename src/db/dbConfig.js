import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("CONNECTED")
    }
    catch(error){
        console.error("error conneting to the db",error);

    }
};