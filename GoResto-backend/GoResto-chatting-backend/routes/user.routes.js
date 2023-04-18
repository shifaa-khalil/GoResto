const { Router } = require("express");
const router = Router();

const {
  addChat,
  getChats,
  getMessages,
  sendMessage,
} = require("../controllers/user.controllers");

router.post("/addChat", addChat);
router.get("/user/:userId/getChats", getChats);
router.get("/chat/:chatId/getMessages", getMessages);
router.post("/sendMessage", sendMessage);

module.exports = router;
