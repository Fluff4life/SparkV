// KingCh1ll //
// Last Edited: 1/21/2021 //
// Index.js //

// Please reframe from stealing as of copyright. //
console.log("  _                     _ _             ")
console.log(" | |                   | (_)            ")
console.log(" | |     ___   __ _  __| |_ _ __   __ _ ")
console.log(" | |    / _ \\ / _` |/ _` | | '_ \\ / _` |")
console.log(" | |___| (_) | (_| | (_| | | | | | (_| |")
console.log(" |______\\___/ \\__,_|\\__,_|_|_| |_|\\__, |")
console.log("                                   __/ |")
console.log("                                  |___/")

// Librarys //
const { Client, Collection } = require("discord.js")
const { config } = require("dotenv")

// Start Dotenv //--
config({
  path: __dirname + "/.env"
})

// Prepare Database //
require("./database/connector")

// Create Bot //
const Bot = new Client({
  disableEveryone: true,

  presence: {
    activity: {
      name: `Loading bot!`,
      type: "PLAYING"
    },
    status: "DND"
  }
})

// DataModule //
Bot.DataSchemas = require("./database/schemas")

// Modules //
const functions = require("./modules/functions")
const Noblox = require("./DependencyHandlers/noblox")
const Distube = require("./DependencyHandlers/distube")
const EventLoader = require("./Loaders/eventloader")
const CommandsLoader = require("./Loaders/commandsloader")

// Get User Count //
Bot.TotalMembers = 0

// Collections //
Bot.categories = new Collection()
Bot.commands = new Collection()
Bot.aliases = new Collection()
Bot.events = new Collection()
Bot.cooldowns = new Collection()

// Code //
console.log("---------- Loading Bot Functions ----------") 
functions(Bot)

console.log("---------- Loading DisTube ----------") 
Distube(Bot)

console.log("---------- Loading Events ----------")
EventLoader(Bot)

console.log("---------- Loading Commands ----------")
CommandsLoader(Bot)

console.log("---------- Logging into Roblox ----------") 
Noblox(Bot)

Bot.login(process.env.token)