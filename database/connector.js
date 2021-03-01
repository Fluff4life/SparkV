const mongoose = require("mongoose")
const QuickMongo = require("quickmongo")
const Database = new QuickMongo.Database(process.env.mongooseURL)

module.exports = async (Bot) => {
    Database.on("ready", () => {
        Bot.Log("SUCCESS", "DATABASE SUCCESS", `Successfully connected to database!`)
    })

    Bot.Database = Database
}