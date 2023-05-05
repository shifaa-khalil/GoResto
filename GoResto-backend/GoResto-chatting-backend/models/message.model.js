const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: Number },
  chatId: { type: mongoose.ObjectId, ref: "Chat" },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
