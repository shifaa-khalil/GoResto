const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const db = mongoose.connection;

    db.on("error", (err) => console.error(err));
    db.once("open", () => console.log("MongoDB connection opened"));

    let bucket;
    db.on("connected", () => {
      const db = mongoose.connections[0].db;
      bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "newBucket" });
      console.log("GridFSBucket initialized");
    });

    return db;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
