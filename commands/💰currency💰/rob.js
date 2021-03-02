const Discord = require("discord.js");

const results = [
  "WIN",
  "LOST"
]

exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.users.first() || Bot.users.cache.get(Arguments[0])

  var Ch1llBucks = await Bot.Database.get(`UserData_${message.author.id}.ch1llbucks`)
  var UserCh1llBucks = await Bot.Database.get(`UserData_${User.id}.ch1llbucks`)
  var Multiplier = await Bot.Database.get(`UserData_${User.id}.multiplier`)

  if (!UserCh1llBucks) {
    return message.channel.send("Bruh he has no money leave them alone you noob!")
  }

  if (Ch1llBucks < 250) {
    return message.channel.send("Bruh he has under ❄250. Leave them alone!")
  }

  const Result = results[Math.floor(Math.random() * results.length)]

  if (!Ch1llBucks) {
    Ch1llBucks = 0
  }

  if (!Multiplier) {
    Multiplier = 1
  }

  if (Result === "WIN") {
    const RandomAmmount = Math.floor(Math.random() * UserCh1llBucks)
    const Ammount = RandomAmmount * Multiplier

    await Bot.Database.add(`UserData_${message.author.id}.ch1llbucks`, Ammount)
    await Bot.Database.subtract(`UserData_${User.id}.ch1llbucks`, 250)

    message.channel.send(`You robbed ${User} and recieved ${Ammount} Ch1llBucks!`)
  } else {

    await Bot.Database.subtract(`UserData_${message.author.id}.ch1llbucks`, 250)
    await Bot.Database.add(`UserData_${User.id}.ch1llbucks`, 250)

    message.channel.send(`LOL you got caught! You payed ❄250 to ${User}.`)
  }
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["crime"],
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
},

  exports.help = {
    name: "Rob",
    description: "why u bully me?",
    usage: "<user>",
    category: "💰currency💰",
    cooldown: 45.0
  }