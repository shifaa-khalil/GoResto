const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: String },
  chatId: { type: mongoose.ObjectId, ref: "Chat" },
  content: { type: String, required: true },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
