const mongoose = require("mongoose")

let ServerData = new mongoose.Schema({
  GuildID: Number,

  Warnings: Array,
  Settings: Array
})

module.exports = mongoose.model("ServerData", ServerData)