const mongoose = require("mongoose")

var ServerData = new mongoose.Schema({
  GuildID: Number,

  Settings: Array,
  Warnings: Array,
})

const MessageModel = module.exports = mongoose.model("ServerData", ServerData)