const mongoose = require("mongoose")

let ModSchema = new mongoose.Schema({
  Guild: String & Number,
  User: String & Number,
  
  Punishments: Array
});

const MessageModel = module.exports = mongoose.model("Moderation", ModSchema)