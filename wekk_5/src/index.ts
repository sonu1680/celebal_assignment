import express from "express";
import mongoose from "mongoose";
import router from "./route/userRoute";


const app = express();
const PORT = 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/mongoose-crud";

app.use(express.json());
app.use("/users", router);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err:any) => {
    console.error("MongoDB connection error:", err);
  });
