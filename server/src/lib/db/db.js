import mongoose from "mongoose";

export default async function connectDb() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Database connection failed: ${error}`);
    process.exit(1);
  }
}
