require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./configs/db.config");
require("./models/role.model");

app.use(express.json());

const userRouter = require("./routes/user.routes");
app.use("/user", userRouter);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) console.error(err);
  console.log("Server is running on port ", process.env.PORT || 3000);
  connectDB();
  console.log("connected");
});
