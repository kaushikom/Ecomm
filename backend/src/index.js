import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config();
console.log(process.env.PORT);
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("🌏 Server started at PORT: ", process.env.PORT || 8000);
    });
  })
  .catch((err) => {
    console.log("Mongo DB connection err");
  });
