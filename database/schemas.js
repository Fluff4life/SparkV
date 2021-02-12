const { Schema, model } = require("mongoose")

var UserData = new Schema({
  UserID: Number,
})

var ServerData = new Schema({
  GuildID: Number,

  Settings: Array,
  Punishments: Array,
})

module.exports.User = model("UserData", UserData)
module.exports.Server = model("ServerData", ServerData)