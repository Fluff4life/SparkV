// KingCh1ll //
// 4/22/2021 //

// Libarys //
const { config } = require("dotenv")
const { ShardingManager } = require("discord.js");
const { init } = require("@sentry/node");
const mongoose = require("mongoose")
const fs = require("fs")

// Varibles //
const PackageInfo = require("./package.json");
const Config = require("./globalconfig.json")
const Logger = require("./modules/logger");
const logger = require("./modules/logger");

// Loading //
console.log(require("chalk").green("  _                     _ _             "))
console.log(require("chalk").green(" | |                   | (_)            "))
console.log(require("chalk").green(" | |     ___   __ _  __| |_ _ __   __ _ "))
console.log(require("chalk").green(" | |    / _ \\ / _` |/ _` | | '_ \\ / _` |"))
console.log(require("chalk").green(" | |___| (_) | (_| | (_| | | | | | (_| |"))
console.log(require("chalk").green(" |______\\___/ \\__,_|\\__,_|_|_| |_|\\__, |"))
console.log(require("chalk").green("                                   __/ |"))
console.log(require("chalk").green("                                  |___/"))

console.log(require("chalk").grey("----------------------------------------"))

// Functions //
async function Start() {
    config({
        path: __dirname + "/.env"
    })

    init({
        dsn: process.env.SentryToken,
        release: `${PackageInfo.name}@${PackageInfo.version}`
    });

    fs.readdir(path.join(__dirname), (err, files) => {
        if (err) return Logger(err, "error")

        files.forEach(file => {
            let EventName = file.split(".")[0]
            let FileEvent = require(`${path.join(__dirname)}/events/${EventName}`)

            process.on(EventName, (...args) => FileEvent.run(...args))
        })
    })

    await mongoose.connect(process.env.mongooseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on("error", console.error.bind(console, "Database connection error! "))
    mongoose.connection.on("open", () => logger("DATABASE - ONLINE"))

    if (Config.Debug.Enabled === true) {
        Logger("DEBUG - ENABLED -> Some features may not work on this mode.")

        if (Config.Debug.BotEnabled === true) {
            await require("./bot/bot")
        }

        if (Config.Debug.WebsiteEnabled === true) {
            await require("./website/website")
        }
    } else {
        if (Config.bot.Sharding.ShardingEnabled === true) {
            await require("./bot/shardManager")
        } else {
            await require("./bot/bot")

            console.log(require("chalk").yellow("WARNING - CH1LLBLOX SHARDING DISABLED"))
        }
    }
}

Start()