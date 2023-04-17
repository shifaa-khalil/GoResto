const { Router } = require("express");
const router = Router();

const {
  getChats,
  getMessages,
  sendMessage,
} = require("../controllers/user.controllers");

router.get("/user/:userId/getChats", getChats);
router.get("/chat/:chatId/getMessages", getMessages);
router.post("/sendMessage", sendMessage);

module.exports = router;
