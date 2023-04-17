const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  firstUserId: { type: mongoose.ObjectId, ref: "User" },
  secondUserId: { type: mongoose.ObjectId, ref: "User" },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
