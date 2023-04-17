const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

exports.getChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await Chat.find({
      $or: [{ firstUserId: userId }, { secondUserId: userId }],
    }).exec();
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getMessages = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const messages = await Message.find({
      $or: [{ chatId: chatId }],
    }).exec();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.sendMessage = async (req, res) => {
  const { senderId, chatId, content } = req.body;

  const message = await Message.create({ senderId, chatId, content });

  res.json(message);
};
