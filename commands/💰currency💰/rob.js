const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.author

  var Ch1llBucks = await Bot.Database.get(`UserData_${User.id}.ch1llbucks`)
  var Multiplier = await Bot.Database.get(`UserData_${User.id}.multiplier`)
  const RandomAmmount = Math.floor(Math.random() * 30) + 1

  if (!Ch1llBucks){
    Ch1llBucks = 0
  }

  if (!Multiplier){
    Multiplier = 1
  }

  const Ammount = RandomAmmount * Multiplier
  
  await Bot.Database.add(`UserData_${User.id}.ch1llbucks`, Ammount)
  message.channel.send(`You begged and recieved ${Ammount} Ch1llBucks!`)
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
  cooldown: 45
}