const { Schema, model } = require("mongoose")

var UserData = new Schema({
  UserID: Number,

  UserExtraDetails: Array
})

var ServerData = new Schema({
  GuildID: String,

  Settings: Array,
  Punishments: Array,
  GuildExtraDetails: Array
})

exports.User = model("UserData", UserData)
exports.Server = model("ServerData", ServerData)