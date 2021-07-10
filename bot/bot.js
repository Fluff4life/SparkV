// KingCh1ll //
// Last Edited: 2/25/2021 //
// Index.js //

// Librarys //
const Discord = require("discord.js")
const fs = require("fs")
const path = require("path")
const AntiSpam = require("discord-anti-spam")
const Statcord = require("statcord.js")

console.log(require("chalk").green("  _                     _ _             "))
console.log(require("chalk").green(" | |                   | (_)            "))
console.log(require("chalk").green(" | |     ___   __ _  __| |_ _ __   __ _ "))
console.log(require("chalk").green(" | |    / _ \\ / _` |/ _` | | '_ \\ / _` |"))
console.log(require("chalk").green(" | |___| (_) | (_| | (_| | | | | | (_| |"))
console.log(require("chalk").green(" |______\\___/ \\__,_|\\__,_|_|_| |_|\\__, |"))
console.log(require("chalk").green("                                   __/ |"))
console.log(require("chalk").green("                                  |___/"))

console.log(require("chalk").grey("----------------------------------------"))

console.log(require("chalk").blue("   ____ _     _ _ _ ____  _           "))
console.log(require("chalk").blue("  / ___| |__ / | | | __ )| | _____  __"))
console.log(require("chalk").blue(" | |   | '_ \| | | |  _ \| |/ _ \ \/ /"))
console.log(require("chalk").blue(" | |___| | | | | | | |_) | | (_) >  < "))
console.log(require("chalk").blue("  \____|_| |_|_|_|_|____/|_|\___/_/\_\ "))                                 

// Create Bot //
require("discord-reply") // Until Discord.js releases 2021 replys, I have this module to do it for me. Will be removed in the future!

const Bot = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],

  presence: {
    activity: {
      name: `Loading Ch1llBlox (99%)`,
      type: "PLAYING"
    },
    status: "dnd"
  }
})
Bot.interaction = {}
require("discord-buttons")(Bot)

if (process.env.StatCordEnabled === "true"){
  const StatClient = new Statcord.Client({
    Bot,
    key: process.env.StatCordAPIKey,
    postCpuStatistics: true,
    postMemStatistics: true,
    postNetworkStatistics: true
  })

  Bot.StatClient = StatClient
}

global.Bot = Bot

// Modules //
const functions = require("../modules/functions")
const Distube = require("../modules/dependencies/distubehandler")
const botlists = require("../modules/dependencies/botlists")
const giveawayshandler = require("../modules/dependencies/giveawayshandler")
const Config = require("../globalconfig.json")
var Noblox

if (Config.Debug.Enabled === false) {
  Noblox = require("../modules/dependencies/noblox")
}

// Schemas
Bot.UserShema = require("../modules/models/UserData")

// Collections //
Bot.Rules = new Discord.Collection()
Bot.categories = new Discord.Collection()
Bot.commands = new Discord.Collection()
Bot.aliases = new Discord.Collection()
Bot.events = new Discord.Collection()
Bot.cooldowns = new Discord.Collection()

Bot.AntiSpam = new AntiSpam({
  warnThreshold: 3,
  muteThreshold: 6,
  kickThreshold: 12,
  banThreshold: 24,
  maxInterval: 5500,
  warnMessage: "{@user}, please stop spamming. If you continue to spam, you'll be muted.",
  kickMessage: "**{user_tag}** has been kicked for spamming.",
  muteMessage: "**{user_tag}** has been muted for spamming.",
  banMessage: "**{user_tag}** has been banned for spamming.",
  maxDuplicatesWarning: 5,
  maxDuplicatesKick: 12,
  maxDuplicatesBan: 24,
  exemptPermissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
  ignoreBots: true,
  verbose: true, 
  ignoredUsers: [],
  muteRoleName: "Muted",
  removeMessages: true
})

// Code //
Bot.Config = Config

console.log("---------- Loading Bot Functions ----------")
functions(Bot)

console.log("---------- Loading DisTube ----------")
Distube(Bot)

console.log("---------- Loading botlists ----------")
botlists(Bot)

console.log("---------- Loading GiveawaysHandler ----------")
giveawayshandler(Bot)

console.log("---------- Loading Events ----------")
fs.readdir(path.join(`${__dirname}/events`), (err, files) => {
  if (err) {
    return Bot.Log("ERROR", "EVENT LOADING ERROR", err)
  }

  files.forEach(file => {
    let EventName = file.split(".")[0]
    let FileEvent = require(`./events/${EventName}`)

    Bot.on(EventName, (...args) => FileEvent.run(Bot, ...args))
  })
})

console.log("---------- Loading Commands ----------")
fs.readdir(path.join(`${__dirname}/commands`), (err, cats) => {
  if (err) {
    return Bot.Log("ERROR", "COMMANDS LOADING ERROR", err)
  }

  cats.forEach(cat => {
    Bot.categories.set(cat, cat)

    fs.readdir(path.join(`${__dirname}/commands/${cat}`), (err, files) => {
      files.forEach(file => {
        if (!file.endsWith(".js")) {
          return
        }

        let commandname = file.split(".")[0]
        let FileJs = require(`./commands/${cat}/${commandname}`)

        Bot.commands.set(commandname, FileJs)
      })
    })
  })
})

console.log("---------- Logging into Roblox ----------")
if (Config.Debug.Enabled === false) {
  Noblox(Bot)
}

console.log("---------- Connecting to Website ----------")
Bot.SocketioClient = require("socket.io-client").connect(`https://${process.env.baseURL}/api/communication?token=8010405464675`, {
  reconnection: true,
  reconnectionDelay: 2000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity
})

Bot.SocketioClient.on("connect", () => console.log("Website connected successfully."))

console.log("---------- Logging into Bot ----------")
Bot.login(process.env.token)

console.log(require("chalk").blue("SUCCESS - BOT LOADING COMPLETE"))

return Bot