const Discord = require("discord.js");
const ms = require("parse-ms")

exports.run = async (Bot, message, Arguments) => {
  const RandomAmmount = Math.floor(Math.random() * 3500) + 1

  var Ch1llBucks = await Bot.Database.get(`UserData_${message.author.id}.ch1llbucks`)
  var Multiplier = await Bot.Database.get(`UserData_${message.author.id}.multiplier`)

  if (!Multiplier){
    Multiplier = 1
  }

  if (!Ch1llBucks){
    Ch1llBucks = 0
  }

  const Ammount = RandomAmmount * Multiplier

  await Bot.Database.add(`UserData_${message.author.id}.ch1llbucks`, Ammount)
  message.channel.send(`You've just earned ❄${await Bot.FormatNumber(Ammount)} Ch1llBucks!`)
},

  exports.config = {
    name: "Daily",
    description: "Collect your daily ammount of Ch1llBucks!",
    aliases: [],
    usage: "",
    category: "💰currency💰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 86400
  }