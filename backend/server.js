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

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on port ${process.env.PORT}`);
});

// Socket io
import { Server } from "socket.io";

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log(userData._id);
    socket.emit("connected");
  });

  //join chat
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });

  //sending message
  socket.on("new message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if (!chat.users) return console.log("Chat.users not defined");

    //emit message to all other user except me
    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
});
