const mongoose = require("mongoose")

let PrefixSchema = new mongoose.Schema({
  GuildID: Number,

  Prefix: Array
})

module.exports = mongoose.model("Prefix", PrefixSchema)