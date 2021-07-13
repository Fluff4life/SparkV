// KingCh1ll //
// 4/22/2021 //

// Libarys //
const DotEnv = require("dotenv")
const Sentry = require("@sentry/node");
const mongoose = require("mongoose")
const fs = require("fs")

// Varibles //
const PackageInfo = require("./package.json");
const Config = require("./globalconfig.json")
const Logger = require("./modules/logger");

// Start Env //--
DotEnv.config({
    path: __dirname + "/.env"
})

Sentry.init({
    dsn: process.env.SentryToken,
    release: `${PackageInfo.name}@${PackageInfo.version}`,
    tracesSampleRate: 1.0,
    integrations: []
});

// Functions //
async function Start() {
    if (Config.Debug.Enabled === true) {
        Logger("Systems Starting")
    }

    fs.readdir("./modules/events", (err, files) => {
        if (err) {
            return Logger(err, "error")
        }

        files.forEach(file => {
            let EventName = file.split(".")[0]
            let FileEvent = require(`./modules/events/${EventName}`)

            process.on(EventName, (...args) => FileEvent.run(...args))
        })
    })

    if (Config.Debug.Enabled === true) {
        Logger("Error Handlers - Online")
    }

    await mongoose.connect(process.env.mongooseURL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    mongoose.connection.on("error", console.error.bind(console, "Database connection error! "))
    mongoose.connection.on("open", function () {
        console.log(require("chalk").green("DATABASE - ONLINE"))
    })

    if (Config.Debug.Enabled === true) {
        let Client

        Logger("DEBUG - ENABLED -> Some features may not work on this mode.")

        if (Config.Debug.BotEnabled === true) {
            const Bot = require("./bot/bot")
            
            Client = await Bot.init(process.env.token)
        }

        if (Config.Debug.WebsiteEnabled === true) {
            require("./website/website")
        }
    } else {
        if (Config.Bot.Sharding.ShardingEnabled === true) {
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
                    Logger("Fatal", err, {
                        shard: Shard.id
                    })

                    console.log(require("chalk").red(`SHARD DISCONNECTED - SHARD ${Shard.id}/${ShardManager.totalShards} DISCONNECTED. ${event}`))
                })

                Shard.on("reconnecting", () => {
                    console.log(require("chalk").red(`SHARD RECONNECTING - SHARD ${Shard.id}/${ShardManager.totalShards} RECONNECTING`))
                })

                Shard.on("death", (event) => {
                    Logger("Fatal", err, {
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

            if (Config.Bot.Sharding.ShardingEnabled) {
                setTimeout(() => {
                    ShardManager.respawn = false
                    ShardManager.broadcastEval("process.exit()")
                }, Config.Bot.Sharding.ShardLifeTime * 1000)

                setTimeout(() => {
                    process.exit()
                }, (Config.Bot.Sharding.ShardLifeTime + 5) * 1000)
            }
        } else {
            require("./bot/bot")

            console.log(require("chalk").yellow("WARNING - CH1LLBLOX SHARDING DISABLED"))
        }
    }
}

Start()