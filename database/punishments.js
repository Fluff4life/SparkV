const mongoose = require("mongoose")

let WarningsScema = new mongoose.Schema({
  GuildID: Number,
  UserID: Number,

  Warnings: Array
})

module.exports = mongoose.model("Warnings", WarningsScema)