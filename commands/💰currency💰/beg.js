const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.author

  var Ch1llBucks = await Bot.Database.get(`UserData_${User.id}.ch1llbucks`)
  var Multiplier = await Bot.Database.get(`UserData_${User.id}.multiplier`)
  const RandomAmmount = Math.floor(Math.random() * 500) + 1

  if (!Ch1llBucks){
    Ch1llBucks = 0
  }

  if (!Multiplier){
    Multiplier = 1
  }

  const Ammount = RandomAmmount * Multiplier

  await Bot.Database.add(`UserData_${User.id}.ch1llbucks`, Ammount)
  message.channel.send(`You begged and recieved ${await Bot.FormatNumber(Ammount)} Ch1llBucks!`)
},

exports.config = {
  name: "Balance",
  description: "Beg for coins.",
  aliases: ["ask"],
  usage: "<optional user>",
  category: "💰currency💰",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 45
}