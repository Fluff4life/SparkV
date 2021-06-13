const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    id: Array
})

module.exports = mongoose.model("UserData", UserSchema)
