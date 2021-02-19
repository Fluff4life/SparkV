const mongoose = require("mongoose")

let data = new mongoose.Schema({
  GuildID: Number,
  UserID: Number,

  Warnings: Array,
  Settings: Array
})

module.exports = mongoose.model("data", data)