const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const { ObjectId } = require("bson");

exports.addChat = async (req, res) => {
  try {
    const objectFirstUserId = new ObjectId(req.body.firstUserId);
    const objectSecondUserId = new ObjectId(req.body.secondUserId);

    const chat = new Chat({
      firstUserId: objectFirstUserId,
      secondUserId: objectSecondUserId,
    });

    await chat.save();

    res.json({
      chat_id: chat._id,
      firstUserId: chat.firstUserId,
      secondUserId: chat.secondUserId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getChats = async (req, res) => {
  const userId = new ObjectId(req.params.userId);

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

  try {
    const message = await Message.create({ senderId, chatId, content });

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
