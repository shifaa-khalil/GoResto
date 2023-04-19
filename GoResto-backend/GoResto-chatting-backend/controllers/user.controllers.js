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
    const objectSenderId = new ObjectId(req.body.senderId);
    const objectChatId = new ObjectId(req.body.chatId);
    const content = req.body.content;

    const message = new Message({
      senderId: objectSenderId,
      chatId: objectChatId,
      content: content,
    });

    await message.save();

    res.json({
      messageId: message._id,
      senderId: objectSenderId,
      chatId: objectChatId,
      content: content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not send message" });
  }
};

exports.getChats = async (req, res) => {
  const userId = new ObjectId(req.params.userId);

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

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
