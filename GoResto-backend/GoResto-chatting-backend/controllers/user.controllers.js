const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const { ObjectId } = require("bson");

exports.addChat = async (req, res) => {
  try {
    const chat = new Chat({
      firstUserId: req.userId,
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
      senderId: req.userId, //auth
      chatId: req.body.chatId,
      content: req.body.content,
    });

    if (!ObjectId.isValid(message.chatId)) {
      return res.status(400).json({ message: "Invalid chatId" });
    }

    await message.save();

    const chat = await Chat.findOneAndUpdate(
      { _id: message.chatId },
      { lastMessage: message._id },
      { new: true }
    );

    res.json({
      messageId: message._id,
      senderId: message.senderId,
      chatId: message.chatId,
      content: message.content,
      createdAt: message.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not send message" });
  }
};

exports.getChats = async (req, res) => {
  const userId = req.userId;

  try {
    const chats = await Chat.find({
      $or: [{ firstUserId: userId }, { secondUserId: userId }],
    }).populate({
      path: "lastMessage",
      select: "content createdAt",
      sort: { createdAt: -1 },
      limit: 1,
    });

    const chatsWithTimestamp = chats.map((chat) => ({
      chatId: chat._id,
      firstUserId: chat.firstUserId,
      secondUserId: chat.secondUserId,
      lastMessage: chat.lastMessage
        ? {
            content: chat.lastMessage.content,
            createdAt: chat.lastMessage.createdAt,
          }
        : null,
    }));
    res.json({ chats: chatsWithTimestamp });
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

    res.json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
