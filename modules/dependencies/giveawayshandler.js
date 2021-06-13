const { GiveawaysManager } = require("discord-giveaways")

module.exports = async (Bot) => {
class GiveawayManagerWithOwnDatabase extends GiveawaysManager {
        async getAllGiveaways(){
            return await Bot.giveaways
        }

        async saveGiveaway(MessageID, GiveawayData){
            await Bot.Database.push("giveaways", GiveawayData)

            return true
        }

        async editGiveaway(MessageID, NewGiveawayData){
            const Giveaways = await Bot.Database.get("giveaways")
            const NewGiveawaysArray = Giveaways.filter((giveaway) => giveaway.messageID !== MessageID)

            NewGiveawaysArray.push(NewGiveawayData)
            await Bot.Database.set("giveaways", NewGiveawaysArray)

            return true
        }

        async deleteGiveaway(MessageID){
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
