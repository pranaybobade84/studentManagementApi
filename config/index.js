import app from "../app.js";
import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    app.on("error", (error) => {
      console.log(`ERROR OCCURRED on Connecting ${error}`);
    });

    console.log(
      `\n MONGODB CONNECTED !!! DB HOST ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("ERROR :" + err);
    process.exit(1);
  }
};
