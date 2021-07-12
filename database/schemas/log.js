const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    commandName: {
        type: String,
        default: "unknown"
    },
    author: {
        type: Object,
        default: {
            username: "unknown",
            discrminator: "#0000",
            id: null
        }
    },
    date: {
        type: Number,
        default: Date.now()
    },
    guild: {
        type: Object,
        default: {
            name: "unknown",
            channel: null,
            id: null
        }
    }
})

module.exports = mongoose.model("Log", Schema)