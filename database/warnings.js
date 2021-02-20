const mongoose = require("mongoose")

let WarningsScema = new mongoose.Schema({
  GuildID: Number,
  UserID: Number,

  Punishments: Array
})

module.exports = mongoose.model("Warnings", WarningsScema)