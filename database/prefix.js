const mongoose = require("mongoose")

let PrefixSchema = new mongoose.Schema({
  GuildID: Number,
  GuildName: String,

  Prefix: String
})

module.exports = mongoose.model("Prefix", PrefixSchema)