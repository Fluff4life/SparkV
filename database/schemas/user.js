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
            enabled: false,
            reason: "No reason supplied."
        }
    },
    money: {
        type: Object,
        default: {
            balance: 0,
            bank: 0,
            bankSpace: 1000
        }
    }
})

module.exports = mongoose.model("User", Schema)