// KingCh1ll //
// 4/22/2021 //

// Libarys //
const fs = require("fs");
const path = require("path");
const { init } = require("@sentry/node");
const { ShardingManager } = require("discord.js");
const mongoose = require("mongoose");

// Varibles //
const Config = require("./globalconfig.json");
const Logger = require("./modules/logger");
const PackageInfo = require("./package.json");

// Loading Splash Screen
console.log(require("asciiart-logo")(require("./package.json")).render());

if (require("./globalconfig.json").Debug.Enabled === true) {
    console.log(
        require("chalk").grey("----------------------------------------")
    );
    require("./modules/logger")(
        "DEBUG - ENABLED -> Some features may not work on this mode."
    );
    console.log(
        require("chalk").grey("----------------------------------------")
    );
}

// Functions //
async function Start() {
    fs.readdir(path.join(`${__dirname}/events`), (err, files) => {
        if (err) return Logger(err, "error");

        files.forEach((file) => {
            let EventName = file.split(".")[0];
            let FileEvent = require(`./events/${EventName}`);

            process.on(EventName, (...args) => FileEvent.run(...args));
        });
    });

    init({
        dsn: process.env.SENTRYTOKEN,
        release: `${PackageInfo.name}@${PackageInfo.version}`,
    });

    await mongoose.connect(process.env.MONGOOSEURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.on(
        "error",
        console.error.bind(console, "Database connection error!")
    );
    mongoose.connection.on("open", () => Logger("DATABASE - ONLINE"));

    if (Config.Debug.Enabled === true) {
        if (Config.Debug.BotEnabled === true) {
            await require("./bot/bot");
        }

        if (Config.Debug.WebsiteEnabled === true) {
            await require("./website/website");
        }
    } else if (Config.bot.Sharding.ShardingEnabled === true) {
        await require("./bot/shardManager");
    } else {
        await require("./bot/bot");
    }
}

Start();
