require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./configs/db.config");
const User = require("./models/user.model");
require("./models/role.model");
const Message = require("./models/message.model");
const Chat = require("./models/chat.model");

app.use(express.json());

const userRouter = require("./routes/user.routes");
app.use("/user", userRouter);

app.listen(process.env.PORT, async (err) => {
  if (err) console.error(err);
  console.log("Server is running on port ", process.env.PORT);
  await connectDB();
  console.log("connected");
});

// app.listen(3000, async () => {
//   console.log("server listening on port 3000");
//   await connectDB();
//   console.log("connected");
//   //   const message = new Message({
//   //     senderId: "643d3a4526a9ab9b49fdfc90",
//   //     chatId: "643d8401b0f8d5ac5a9649aa",
//   //     content: "h r u",
//   //   });
//   //   await message.save();
// });

app.use(express.json());
