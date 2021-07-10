const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    UserID: String,
    Reason: String
})

module.exports = mongoose.model("Afks", Schema)