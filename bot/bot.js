// KingCh1ll //
// Last Edited: 2/25/2021 //
// Index.js //

// Librarys //
const Discord = require("discord.js")
const fs = require("fs")
const path = require("path")
const AntiSpam = require("discord-anti-spam")
const Statcord = require("statcord.js")

// Create Bot //
console.log(require("chalk").blue("   ____ _     _ _ _ ____  _           "))
console.log(require("chalk").blue("  / ___| |__ / | | | __ )| | _____  __"))
console.log(require("chalk").blue(" | |   | '_ \| | | |  _ \| |/ _ \ \/ /"))
console.log(require("chalk").blue(" | |___| | | | | | | |_) | | (_) >  < "))
console.log(require("chalk").blue("  \____|_| |_|_|_|_|____/|_|\___/_/\_\ "))

const Client = require("./bot/client")
const Ch1llBlox = new Client({
    bot: {
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_INVITES,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
        ],
        partials: [
            "REACTION",
            "MESSAGE",
            "CHANNEL",
            "GUILD_MEMBER"
        ],
        allowedMentions: {
            parse: [
                "users",
                "roles",
                "everyone"
            ],
            repliedUser: true
        },
        presence: {
            activity: {
                name: `Loading Ch1llBlox (99%)`,
                type: "PLAYING"
            },
            status: "dnd"
        }
    }
})

async function Start(){
    await Ch1llBlox.LoadEvents(__dirname)
    await Ch1llBlox.LoadCommands(__dirname)

    await Ch1llBlox.LoadModules()

    Ch1llBlox.SocketioClient = require("socket.io-client").connect(`https://${process.env.baseURL}/api/communication?token=8010405464675`, {
        reconnection: true,
        reconnectionDelay: 2000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity
        })

    Ch1llBlox.SocketioClient.on("connect", () => console.log("Website connected successfully."))
}

Start()

Ch1llBlox.login(process.env.token)