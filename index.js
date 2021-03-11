const { config } = require("dotenv")
const Discord = require("discord.js")

const { GlobalCache } = require("./modules/globalcache")

// Start Dotenv //--
config({
    path: __dirname + "/.env"
})

if (process.env.TestMode === "true") {
    console.log("WARNING - SHARDMANAGER => Failed to activate Shard Manager. Calling bot file without sharding features!");

    if (process.env.BotEnabled === "true") {
        require("./ch1llblox");
    }

    if (process.env.WebsiteEnabled === "true") {
        require("./ch1llwebsite")
    }
} else {
    const Discord = require("discord.js");
    const ShardManager = new Discord.ShardingManager("./ch1llblox.js", {
        token: process.env.token,
        totalShards: Number(process.env.TotalShards) || "auto",
        shardArgs: typeof v8debug === "object" ? ["--inspect"] : undefined,
        execArgv: ["--trace-warnings"]
    })

    // Shard Handlers //
    ShardManager.on("shardCreate", (Shard) => {
        console.log(`SUCCESS - SHARD ${Shard.id + 1}/${ShardManager.totalShards} DEPLOYED`)
    })

    ShardManager.spawn(Number(process.env.TotalShards) || "auto", 8000, -1);
    global.GlobalCache = new GlobalCache(ShardManager)

    if (process.env.ShardLifeTime){
        setTimeout(() => {
            ShardManager.respawn = false
            ShardManager.broadcastEval("process.exit()")
        }, process.env.ShardLifeTime * 1000)

        setTimeout(() => {
            process.exit()
        }, (process.env.ShardLifeTime + 5) * 1000)
    }
}