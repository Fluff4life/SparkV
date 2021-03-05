const mongoose = require("mongoose")
const QuickMongo = require("quickmongo")
const Levels = require("discord-xp");
const Database = new QuickMongo.Database(process.env.mongooseURL)

module.exports = async (Bot) => {
    Database.on("ready", () => {
        Bot.Log("SUCCESS", "DATABASE SUCCESS", `Successfully connected to database!`)
    })

    Levels.setURL(process.env.mongooseURL)

    Bot.Database = Database
}