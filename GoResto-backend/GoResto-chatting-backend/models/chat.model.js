const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  firstUserId: { type: Number },
  secondUserId: { type: Number },
  lastMessage: {
    type: mongoose.ObjectId,
    ref: "Message",
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
