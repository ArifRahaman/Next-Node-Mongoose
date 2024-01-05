const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/demo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const server = express();
const bodyParser = require("body-parser");

server.use(cors());
server.use(bodyParser.json());

server.post("/demo", async (req, res) => {
  try {
    let user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    const doc = await user.save();
    console.log(doc);

    // Sending a single response with the saved user
    res.json(doc);
  } catch (error) {
    console.error("Error saving user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

server.listen(8080, () => {
  console.log("server is running");
});

// Call the main function to connect to the database
main();
