const { Schema, model } = require("mongoose")

var UserData = new Schema({
  UserID: Number,
})

var ServerData = new Schema({
  GuildID: String,

  Settings: Array,
  Punishments: Array,
})

exports.User = model("UserData", UserData)
exports.Server = model("ServerData", ServerData)