import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "";
    const dbName = process.env.MONGO_INITDB_DATABASE || process.env.DB_NAME || 'qualifica-professor';
    await mongoose.connect(uri, {
      dbName
    });
    console.log(`Connected to MongoDB (db: ${dbName})`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};