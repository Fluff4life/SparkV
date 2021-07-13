const { GiveawaysManager } = require("discord-giveaways")
const QuickMongo = require("quickmongo")
const Levels = require("discord-xp");

const logger = require("../../modules/logger")

const Database = new QuickMongo.Database(process.env.mongooseURL)

module.exports = async (Bot) => {
    Database.on("ready", async () => {
        if ((await Database.get("giveaways")) === null) {
            await Database.set("giveaways", [])
        }
    })

    Database.on("error", async (err) => {
        exports.run = async (err, promise) => {
            await logger(`Database error! ${err.stack}`, "error")
        }
        
    })

    Levels.setURL(process.env.mongooseURL)

    Bot.Database = Database
    global.Database = Database

    class GiveawayManagerWithOwnDatabase extends GiveawaysManager {
        async getAllGiveaways() {
            return await Bot.Database.get("giveaways")
        }

        async saveGiveaway(MessageID, GiveawayData) {
            await Bot.Database.push("giveaways", GiveawayData)

            return true
        }

        async editGiveaway(MessageID, NewGiveawayData) {
            const Giveaways = await Bot.Database.get("giveaways")
            const NewGiveawaysArray = Giveaways.filter((giveaway) => giveaway.messageID !== MessageID)

            NewGiveawaysArray.push(NewGiveawayData)
            await Bot.Database.set("giveaways", NewGiveawaysArray)

            return true
        }

        async deleteGiveaway(MessageID) {
            const Data = await Bot.Database.get("giveaways")
            const NewGiveawaysArray = Data.filter((giveaway) => giveaway.messageID !== MessageID)

            await Bot.Database.set("giveaways", NewGiveawaysArray)

            return true
        }
    }

    const Manager = new GiveawayManagerWithOwnDatabase(Bot, {
        updateCountdownEvery: 2.5 * 1000,
        default: {
            botsCanWin: false,
            exemptPermissions: [],
            embedColor: Bot.Config.Bot.Embed.Color,
            embedColorEnd: "#FF0000",
            reaction: "🎉"
        }
    })

    Bot.GiveawayManager = Manager
}
