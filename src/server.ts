import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.gyrha.mongodb.net/library_management?retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log("mongoose connected");

    server = app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
