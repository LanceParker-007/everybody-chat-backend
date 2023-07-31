//chatName
//isGroupChat
//users
//latestMessage
//groupAdmin

import mongoose from "mongoose";

const chatModel = mongoose.Schema(
  {
    chatName: {
      type: "string",
      trim: true,
    },
    isGroupChat: {
      type: "boolean",
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId, //ref to that particulat user
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId, // ref to that Particulat Message
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId, //ref to that particulat user
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Chat = mongoose.model("Chat", chatModel);
//Chat is the ref when used
