// KingCh1ll //
// L.E: 12/1/2020 //
// Index.js //

// DO NOT STEAL BECAUSE YOU AREN'T ALLOWED TO!
// Please reframe from stealing as of copyright.
// The last thing you need is getting sued by me ). //

console.log("------------------------------------------------")
console.log("  _                     _ _             ")
console.log(" | |                   | (_)            ")
console.log(" | |     ___   __ _  __| |_ _ __   __ _ ")
console.log(" | |    / _ \\ / _` |/ _` | | '_ \\ / _` |")
console.log(" | |___| (_) | (_| | (_| | | | | | (_| |")
console.log(" |______\\___/ \\__,_|\\__,_|_|_| |_|\\__, |")
console.log("                                   __/ |")
console.log("                                  |___/")
console.log("------------------------------------------------")

// Librarys //
const Discord = require("discord.js")
const fs = require("fs")
const dotenv = require("dotenv")

console.log("Succesfully loaded Librarys")

// Modules //
const RunFunctions = require("./modules/functions.js")

// Start Dotenv //--
dotenv.config({
  path: __dirname + "/.env"
})

// Bot creator //
const Bot = new Discord.Client({
  shards: "auto",

  presence: {
    activity: {
      name: `Loading bot! Please wait...`,
      type: "PLAYING",
    },
    status: "DND"
  },
})

// Collections //
Bot.categories = new Discord.Collection()
Bot.commands = new Discord.Collection()
Bot.aliases = new Discord.Collection()
Bot.events = new Discord.Collection()
Bot.cooldowns = new Discord.Collection()

const ConsoleLog = false

// Error Handlers //
process.on("uncaughtException", (err) => {
  const ErrorMessage = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./")

  console.log(`Uncaught Exception error! ${ErrorMessage}`)
  console.error(err)

  process.exit(1)
})

process.on("unhandledRejection", err => {
  console.log(`Unhandled rejection error! ${err}`)
})

// Code //
RunFunctions(Bot)

fs.readdir("./events/", (err, files) => {
  if (err) {
    return console.log(`Error! ${err}`)
  }

  files.forEach((file) => {
    let FileEvent = require(`./events/${file}`)
    let EventName = file.split(".")[0]

    if (ConsoleLog){
      console.log(`✅Successfully loaded Event ${EventName}`)
    }

    Bot.on(EventName, (...args) => FileEvent.run(Bot, ...args))
  })
})

fs.readdir("./commands/", (err, cats) => {
  cats.forEach((cat) => {
    Bot.categories.set(cat, cat)

    fs.readdir(`./commands/${cat}/`, (err, files) => {
      files.forEach((file) => {
        if (!file.endsWith(".js")){
          return
        }
    
        let FileJs = require(`./commands/${cat}/${file}`)
        let commandname = file.split(".")[0]
    
        Bot.commands.set(commandname, FileJs)

        if (ConsoleLog){
          console.log(`✅Successfully loaded command: ${commandname}!`)
        }
      })
    })
  })
})

Bot.login(process.env.token)