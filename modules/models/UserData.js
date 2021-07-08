const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userid: {
      username: String,
      tag: String
    }
})

module.exports = mongoose.model("UserData", UserSchema)
