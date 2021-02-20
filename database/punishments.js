const mongoose = require("mongoose")

let PunishmentsScema = new mongoose.Schema({
  GuildID: Number,
  UserID: Number,

  Warnings: Array
})

module.exports = mongoose.model("Punishments", PunishmentsScema)
