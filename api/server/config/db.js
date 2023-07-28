import mongoose from "mongoose";

export async function connectDB() {
  const { connection } = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected: ${connection.host}`.cyan.underline.bold);
}
