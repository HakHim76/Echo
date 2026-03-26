import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import path from "path";

const app = express();

app.use(express.json());
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/auth", messageRoutes);

const PORT = process.env.PORT;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo up and running");

    app.listen(PORT, () => {
      console.log(`listening on port:${PORT}`);
    });
  } catch (error) {
    console.log("mongo connection failed miserably:", error.message);
    process.exit(1);
  }
}

startServer();
