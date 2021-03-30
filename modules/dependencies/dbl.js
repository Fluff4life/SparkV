const DBLApi = require("dbl-api")
const TopggAPI = require("dblapi.js")
const Express = require("express")

module.exports = async (Bot) => {
    const stats = new TopggAPI(process.env.dblkey, Bot)
    const API = new DBLApi({
        port: process.env.port,
        path: "/api/vote"
    })

    setInterval(async () => {
        const ServerCount = await Bot.GetServerCount()

        stats.postStats(ServerCount) // shardId: Bot.shard.ids[0], shardCount: Bot.options.shardCount
    }, 2000 * 1000)

    Express.Router().post('/api/vote', API.handler);

    API.on("upvote", async (user) => {
        const User = await Bot.users.fetch(user)
        
        var Multiplier = await Bot.Database.get(`${user}.multiplier`)

        if (!Multiplier) {
            Multiplier = 1
        }

        await Bot.Database.add(`UserData_${user}.ch1llbucks`, 1000 * Multiplier)

        User.send(`Thanks for voting!\nYou just earned yourself \`❄${await Bot.FormatNumber(1000 * Multiplier)}\` ch1llbucks for voting on top.gg.`)
        console.log(`User voted! Username: ${User} ID: ${user}.`)
    })
}