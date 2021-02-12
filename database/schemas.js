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

module.exports = {
  User: model("UserData", UserData),
  Server: model("ServerData", ServerData)
}