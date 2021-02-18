const mongoose = require("mongoose")

let ServerData = new mongoose.Schema({
  GuildID: Number,


  Warnings: Array,

  Settings: {
    Prefix: Number
  },
})

module.exports = mongoose.model("ServerData", ServerData)