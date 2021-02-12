const mongoose = require("mongoose")

var UserData = new mongoose.Schema({
  UserID: Number,
})

const MessageModel =  module.exports = mongoose.model("UserData", UserData)