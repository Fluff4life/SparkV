const QuickMongo = require("quickmongo")
const Levels = require("discord-xp");
const Database = new QuickMongo.Database(process.env.mongooseURL)
var bot

module.exports.StartUp = async (Bot) => {
    Database.on("ready", async () => {
        Bot.Log("SUCCESS", "DATABASE SUCCESS", `Successfully connected to database!`)

        if ((await Database.get("giveaways")) === null){
            await Database.set("giveaways", [])
        }
    })

    Database.on("error", async (err) => {
        Bot.Log("ERROR", "DATABASE ERROR", err)
    })

    Levels.setURL(process.env.mongooseURL)

    bot = Bot    
    bot.Database = Database
}

module.exports.Database = async (_) => {
    return bot.Database
}
