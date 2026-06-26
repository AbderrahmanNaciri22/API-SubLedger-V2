import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("MongoDB Connected");

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
} catch (err) {
  console.error(err);
}
