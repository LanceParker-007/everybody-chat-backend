import express from "express";
import { sendMessage } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//Send message
router.route("/").post(protect, sendMessage);

//Fetch all messages of one single chat
// router.route("/:chatId").get(protect, allMessages);

export default router;
