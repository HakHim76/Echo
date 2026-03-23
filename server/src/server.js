import dotenv from "dotenv";

dotenv.config();
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();
app.use("/api/auth", authRoutes);
app.use("/api/auth", messageRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on port:${PORT}`);
});
