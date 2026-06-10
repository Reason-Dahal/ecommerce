import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};
