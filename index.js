const { config } = require("dotenv")
const Config = require("./globalconfig.json")

// Start Dotenv //--
config({
    path: __dirname + "/.env"
})

// Error Handlers //
process.on("uncaughtException", (err, promise) => {
    const ErrorMessage = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./")

    console.log(require("chalk").red(`ERROR => Uncaught Exception error. ${ErrorMessage}.`))
    process.exit(1)
})

process.on("unhandledRejection", (err, promise) => {
    console.log(require("chalk").red(`ERROR => Unhandled rejection error. ${err}.`))
})

process.on("warning", (warning) => {
    console.log(require("chalk").yellow(`WARNING - ${warning.name} => ${warning.message}.`))
})

process.on("exit", (code) => {
    console.log(require("chalk").red(`EXIT - Process exited with code ${code}.`))
})

if (Config.Debug) {
    console.log(require("chalk").yellow("WARNING - DEBUG ONLINE! SHARDING DISABLED => Calling Ch1llBlox without sharding features & website on local-host."))

    require("./ch1llblox")
    require("./ch1llwebsite")
} else {
    if (Config.ShardingEnabled === true) {
        const { GlobalCache } = require("./modules/globalcache")

        const Discord = require("discord.js");
        const ShardManager = new Discord.ShardingManager("./ch1llblox.js", {
            token: process.env.token,
            totalShards: Number(process.env.TotalShards) || "auto",
            shardArgs: typeof v8debug === "object" ? ["--inspect"] : undefined,
            execArgv: ["--trace-warnings"]
        })

        // Shard Handlers //
        ShardManager.on("shardCreate", (Shard) => {
            console.log(require("chalk").green(`DEPLOYING - SHARD ${Shard.id}/${ShardManager.totalShards} DEPLOYING`))

            Shard.on("ready", () => {
                console.log(require("chalk").blue(`DEPLOY SUCCESS - SHARD ${Shard.id}/${ShardManager.totalShards} DEPLOYED SUCCESSFULLY`))
            })

            Shard.on("disconnect", (event) => {
                console.log(require("chalk").red(`SHARD DISCONNECTED - SHARD ${Shard.id}/${ShardManager.totalShards} DISCONNECTED. ${event}`))
            })

            Shard.on("reconnecting", () => {
                console.log(require("chalk").red(`SHARD RECONNECTING - SHARD ${Shard.id}/${ShardManager.totalShards} RECONNECTING`))
            })

            Shard.on("death", (event) => {
                console.log(require("chalk").red(`SHARD CLOSED - SHARD ${Shard.id}/${ShardManager.totalShards} UNEXPECTEDLY CLOSED!\nPID: ${event.pid}\nExit Code: ${event.exitCode}.`))

                if (!event.exitCode) {
                    console.warn(`WARNING: SHARD ${Shard.id}/${ShardManager.totalShards} EXITED DUE TO LACK OF AVAILABLE MEMORY.`)
                }
            })
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
    } else {
        const Discord = require("discord.js");

        console.log(require("chalk").yellow("WARNING - SHARDING DISABLED"))
        require("./ch1llblox")
    }
}