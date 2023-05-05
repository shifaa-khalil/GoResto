const { Router } = require("express");
const router = Router();

const {
  addChat,
  getChats,
  getMessages,
  sendMessage,
} = require("../controllers/user.controllers");

router.post("/chat/:secondUserId", addChat);
router.get("/chats", getChats);
router.get("/messages/:chatId", getMessages);
router.post("/message", sendMessage);

module.exports = router;
