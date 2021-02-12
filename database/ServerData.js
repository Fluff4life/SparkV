const mongoose = require("mongoose")

var ServerData = new mongoose.Schema({
  GuildID: Number,

  Settings: Array,
  Punishments: Array,
})

const MessageModel = module.exports = mongoose.model("UserData", ServerData)