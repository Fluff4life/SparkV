const { GiveawaysManager } = require("discord-giveaways")

module.exports = async (Bot) => {
    class GiveawayManagerWithOwnDatabase extends GiveawaysManager {
        async getAllGiveaways(){
            return await Bot.Database.get("giveaways")
        }

        async saveGiveaway(MessageID, GiveawayData){
            await Bot.Database.push("giveaways", GiveawayData)

            return true
        }

        async EditGiveaway(MessageID, NewGiveawayData){
            const Giveaways = await Bot.Database.get("giveaways")
            const NewGiveawaysArray = Giveaways.filter((giveaway) => giveaway.messageID !== MessageID)

            NewGiveawaysArray.push(GiveawayData)
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

    const GiveawayManager = new GiveawayManagerWithOwnDatabase(Bot, {
        storage: false,
        updateCountdownEvery: 10000,
        default: {
            botsCanWin: false,
            exemptPermissions: ["MANAGE_MESSAGES"],
            embedColor: process.env.EmbedColor,
            embedColorEnd: "#FF0000",
            reaction: "🎉"
        }
    })

    Bot.GiveawaysManager = GiveawaysManager
}
