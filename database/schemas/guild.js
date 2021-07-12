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
    prefix: {
        type: String,
        default: config.Bot.prefix
    },
    settings: {
        type: Object,
        default: {
            welcome: {
                enabled: false,
                channel: null,
                message: null,
                image: null,
                embed: false
            },
            goodbye: {
                enabled: false,
                channel: null,
                message: null,
                image: null,
                embed: false
            }
        }
    }
})

module.exports = mongoose.model("Guild", Schema)