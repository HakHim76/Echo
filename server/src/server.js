import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import path from "path";
import { ENV } from "./lib/env.js";
import {app, server} from "./lib/socket.js"


app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));

app.use(cookieParser())
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = ENV.PORT;

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

async function startServer() {
  try {
    console.log(PORT);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo up and running");

    server.listen(PORT, () => {
      console.log(`listening on port:${PORT}`);
    });
  } catch (error) {
    console.log("mongo connection failed miserably:", error.message);
    process.exit(1);
  }
}

startServer();
