// KingCh1ll //
// 4/22/2021 //

// Libarys //
const { config } = require("dotenv")
const { init, withScope, captureException, Severity, captureEvent, captureMessage } = require("@sentry/node");
const { Transaction } = require("@sentry/integrations");
const { name, version } = require("./package.json");

// Varibles //
const Config = require("./globalconfig.json")

// Start Env //--
config({
    path: __dirname + "/.env"
})

init({
    dsn: process.env.SentryToken,
    release: `${name}@${version}`,
    integrations: [
        new Transaction()
    ],
});

const LogError = (type, err, obj) => {
    if (!type){
        type = "Fatal"
    }

    if (!err){
        err = "Error not specified."
    }

    if (typeof Object(err)){
        return
    }

    withScope((scope) => {
        scope.setLevel(Severity[type])

        if (obj) {
            for (const key of Object.keys(obj)){
                scope.setExtra(key, obj[key])
            }
        }

        captureException(err)
    })
}

global.LogError = LogError

// Error Handlers //
process.on("uncaughtException", async (err, promise) => {
    const ErrorMessage = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./")

    await LogError("Fatal", err)
    console.log(require("chalk").red(`ERROR => Uncaught Exception error. ${ErrorMessage}.`))
    process.exit(1)
})

process.on("unhandledRejection", async (err, promise) => {
    await LogError("Error", err)
    console.log(require("chalk").red(`ERROR => Unhandled rejection error. ${err}.`))
})

process.on("warning", (warning) => {
    LogError("Warning", err)
    console.log(require("chalk").yellow(`WARNING => ${warning.name} => ${warning.message}.`))
})

process.on("exit", (code) => {
    LogError("Fatal", err)
    console.log(require("chalk").red(`EXIT => Process exited with code ${code}.`))
})

if (Config.Debug) {
    console.log(require("chalk").yellow("WARNING => DEBUG ONLINE! SHARDING DISABLED => Calling Ch1llBlox without sharding features & website on local-host."))

    require("./ch1llblox")
    require("./ch1llwebsite")
} else {
    if (Config.sharding.ShardingEnabled === true) {
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
                LogError("Fatal", err, {
                    shard: Shard.id
                })

                console.log(require("chalk").red(`SHARD DISCONNECTED - SHARD ${Shard.id}/${ShardManager.totalShards} DISCONNECTED. ${event}`))
            })

            Shard.on("reconnecting", () => {
                console.log(require("chalk").red(`SHARD RECONNECTING - SHARD ${Shard.id}/${ShardManager.totalShards} RECONNECTING`))
            })

            Shard.on("death", (event) => {
                LogError("Fatal", err, {
                    shard: Shard.id
                })

                console.log(require("chalk").red(`SHARD CLOSED - SHARD ${Shard.id}/${ShardManager.totalShards} UNEXPECTEDLY CLOSED!\nPID: ${event.pid}\nExit Code: ${event.exitCode}.`))

                if (!event.exitCode) {
                    console.warn(`WARNING: SHARD ${Shard.id}/${ShardManager.totalShards} EXITED DUE TO LACK OF AVAILABLE MEMORY.`)
                }
            })
        })

        ShardManager.spawn(Number(process.env.TotalShards) || "auto", 8000, -1);
        global.GlobalCache = new GlobalCache(ShardManager)

        if (Config.sharding.ShardingEnabled) {
            setTimeout(() => {
                ShardManager.respawn = false
                ShardManager.broadcastEval("process.exit()")
            }, Config.sharding.ShardLifeTime * 1000)

            setTimeout(() => {
                process.exit()
            }, (Config.sharding.ShardLifeTime + 5) * 1000)
        }
    } else {
        const Discord = require("discord.js");

        console.log(require("chalk").yellow("WARNING - SHARDING DISABLED"))
        require("./ch1llblox")
    }
}
