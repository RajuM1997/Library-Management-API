import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

const PORT = 5000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://library_management:hBOu2OWxLCxAA3mV@cluster0.gyrha.mongodb.net/library_management?retryWrites=true&w=majority&appName=Cluster0"
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
