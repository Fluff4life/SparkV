const mongoose = require("mongoose")

let ServerData = new mongoose.Schema({
  GuildID: Number,


  Warnings: Array,
  
  Settings: {
    Prefix: Number
  },
})

const MessageModel = module.exports = mongoose.model("ServerData", ServerData)