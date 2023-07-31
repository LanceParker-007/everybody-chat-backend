import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChats,
  removeFromGroup,
  renameGroupChat,
} from "../controllers/chatController.js";

const router = express.Router();

//createChat or fecthcing a one-to-one chat
router.route("/").post(protect, accessChat);

//Get all chats
router.route("/").get(protect, fetchChats);

//Create a group chat
router.route("/group").post(protect, createGroupChat);

//Rename a group chat
router.route("/rename").put(protect, renameGroupChat);

//Add to group chat
router.route("/groupadd").put(protect, addToGroup);

//Remove from group chat
router.route("/groupremove").put(protect, removeFromGroup);

export default router;
