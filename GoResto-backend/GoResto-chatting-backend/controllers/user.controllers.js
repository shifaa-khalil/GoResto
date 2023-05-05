const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const { ObjectId } = require("bson");

exports.addChat = async (req, res) => {
  try {
    const chat = new Chat({
      // firstUserId: req.userId,
      senderId: req.body.senderId, //auth
      secondUserId: req.params.secondUserId,
    });

    await chat.save();

    res.json({
      chatId: chat._id,
      firstUserId: chat.firstUserId,
      secondUserId: chat.secondUserId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create chat" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const message = new Message({
      // const userId = req.userId;
      senderId: req.body.senderId, //auth
      chatId: req.body.chatId,
      content: req.body.content,
    });

    if (!ObjectId.isValid(message.chatId)) {
      return res.status(400).json({ message: "Invalid chatId" });
    }

    await message.save();

    res.json({
      messageId: message._id,
      senderId: message.senderId,
      chatId: message.chatId,
      content: message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not send message" });
  }
};

exports.getChats = async (req, res) => {
  // const userId = req.params.firstUserId; //auth
  const userId = req.userId;
  // res.json({ userId });

  try {
    const chats = await Chat.find({
      $or: [{ firstUserId: userId }, { secondUserId: userId }],
    }).exec();
    res.json({ chats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getMessages = async (req, res) => {
  const chatId = req.params.chatId;

  if (!ObjectId.isValid(chatId)) {
    return res.status(400).json({ message: "Invalid chatId" });
  }

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
