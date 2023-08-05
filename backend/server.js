import express, { urlencoded } from "express";
import { chats } from "./data/data.js";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cors from "cors";

config({
  path: "./backend/config/config.env",
});

connectDB();
const app = express();

// app.use(cors());
app.use(express.json());
app.use(express({ urlencoded: true }));

app.get("/", (req, res) => {
  return res.send(`Api is running.`);
});

//Auth Routes
app.use("/api/user", userRoutes);

//Chat Routes
app.use("/api/chat", chatRoutes);

//Message Routes
app.use("/api/message", messageRoutes);

// Other Routes
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on port ${process.env.PORT}`);
});
