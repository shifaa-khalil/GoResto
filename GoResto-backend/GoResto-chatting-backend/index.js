require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./configs/db.config");
const { authMiddleware } = require("./middlewares/auth.middleware");

app.use(express.json());
app.use(cors());

const userRouter = require("./routes/user.routes");
app.use("/user", authMiddleware, userRouter);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) console.error(err);
  console.log("Server is running on port ", process.env.PORT || 3000);
  connectDB();
});
