const mongoose = require("mongoose")

const config = require("../../globalconfig.json")

const Schema = new mongoose.Schema({
    id: {
        type: String
    },
    guild: {
        type: String
    },
    registrationDate: {
        type: Number,
        default: Date.now()
    }
})

module.exports = mongoose.model("Member", Schema)