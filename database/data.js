const mongoose = require("mongoose")

let BotData = new mongoose.Schema({
  GuildID: Number,
  UserID: Number,

  Warnings: Array,
  Settings: Array
})

module.exports = mongoose.model("BotData", BotData)