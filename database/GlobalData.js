const mongoose = require("mongoose")

let GlobalData = new mongoose.Schema({
  GuildID: Number,
  UserID: Number,

  Warnings: Array
})

const MessageModel = module.exports = mongoose.model("GlobalData", GlobalData)