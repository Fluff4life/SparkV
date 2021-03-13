const { config } = require("dotenv")
const Discord = require("discord.js")

const { GlobalCache } = require("./modules/globalcache")

// Start Dotenv //--
config({
    path: __dirname + "/.env"
})

// Error Handlers //
process.on("uncaughtException", (err, Origin) => {
    const ErrorMessage = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./")

    console.log(require("chalk").red(`ERROR => Uncaught Exception error. ${ErrorMessage}.`))
    process.exit(1)
})

process.on("unhandledRejection", (err, Origin) => {
    console.log(require("chalk").red(`ERROR => Unhandled rejection error. ${err}.`))
})

process.on("warning", (warning) => {
    console.log(require("chalk").yellow(`WARNING - ${warning.name} => ${warning.message}.`))
})

if (process.env.Debug) {
    console.log(require("chalk").yellow("WARNING - SHARDMANAGER => Failed to activate Shard Manager. Calling bot file without sharding features!"))

    if (process.env.BotEnabled) {
        require("./ch1llblox");
    }

    if (process.env.WebsiteEnabled) {
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
        console.log(require("chalk").blue(`SUCCESS - SHARD ${Shard.id + 1}/${ShardManager.totalShards} DEPLOYED`))
    })

    ShardManager.spawn(Number(process.env.TotalShards) || "auto", 8000, -1);
    global.GlobalCache = new GlobalCache(ShardManager)

    if (process.env.ShardLifeTime) {
        setTimeout(() => {
            ShardManager.respawn = false
            ShardManager.broadcastEval("process.exit()")
        }, process.env.ShardLifeTime * 1000)

        setTimeout(() => {
            process.exit()
        }, (process.env.ShardLifeTime + 5) * 1000)
    }
}