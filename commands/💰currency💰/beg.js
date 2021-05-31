const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  var Ch1llBucks = await Bot.Database.get(`UserData.${message.author.id}.ch1llbucks`)
  var Multiplier = await Bot.Database.get(`UserData.${message.author.id}.multiplier`)
  const RandomAmmount = Math.floor(Math.random() * 500) + 1

  if (!Ch1llBucks){
    Ch1llBucks = 0
  }

  if (!Multiplier){
    Multiplier = 1
  }

  const Ammount = RandomAmmount * Multiplier

  await Bot.Database.add(`UserData.${message.author.id}.ch1llbucks`, Ammount)
  message.lineReplyNoMention(`${Bot.Config.Emojis.success} | You begged and recieved ${await Bot.FormatNumber(Ammount)} Ch1llBucks!`)
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
  cooldown: 15
}