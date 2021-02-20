const mongoose = require("mongoose")

let ProfileSchema = new mongoose.Schema({
  Username: String,
  UserID: Number,

  Coins: Number,
})

module.exports = mongoose.model("Profile", ProfileSchema)