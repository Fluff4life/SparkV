const mongoose = require("mongoose")

let AntiSpamScema = new mongoose.Schema({
  GuildID: Number,
  UserID: Number,

  Enabled: Boolean,
  Limit: Number,
  Time: Number,
  Diff: Number
})

module.exports = mongoose.model("AntiSpam", AntiSpamScema)