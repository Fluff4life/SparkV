const { Schema, model } = require("mongoose")

var UserData = new Schema({
  UserID: Number,
})

var ServerData = new Schema({
  GuildID: Number,

  Settings: Array,
  Punishments: Array,
})

exports.User = model("UserData", UserData)
exports.Server = model("ServerData", ServerData)