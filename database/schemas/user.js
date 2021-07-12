const mongoose = require("mongoose")

const config = require("../../globalconfig.json")

const Schema = new mongoose.Schema({
    id: {
        type: String
    },
    registrationDate: {
        type: Number,
        default: Date.now()
    },
    afk: {
        type: Object,
        default: {
            reason: "No reason supplied."
        }
    }
})

module.exports = mongoose.model("User", Schema)