import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cachedDB = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cachedDB.conn) return cachedDB.conn;

  if (!MONGODB_URI)
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );

  cachedDB.promise =
    cachedDB.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });

  cachedDB.conn = await cachedDB.promise;

  return cachedDB.conn;
};
