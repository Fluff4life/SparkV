const Discord = require("discord.js");
const ms = require("parse-ms")

exports.run = async (Bot, message, Arguments) => {
  const User = message.author
  const RandomAmmount = Math.floor(Math.random() * 3500) + 1

  var Ch1llBucks = await Bot.Database.get(`UserData_${User.id}.ch1llbucks`)
  var Multiplier = await Bot.Database.get(`UserData_${User.id}.multiplier`)

  if (!Multiplier){
    Multiplier = 1
  }

  if (!Ch1llBucks){
    Ch1llBucks = 0
  }

  const Ammount = RandomAmmount * Multiplier

  await Bot.Database.subtract(`UserData_${User.id}.ch1llbucks`, Ammount)
  await Bot.Database.add(`UserData_${User.id}.bank`, Ammount)

  message.channel.send(`Deposited ❄${Bot.FormatNumber(Arguments[0])} into bank!`)
},

  exports.config = {
    name: "Daily",
    description: "Collect your daily ammount of money!",
    aliases: ["dep"],
    usage: "",
    category: "💰currency💰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 86400
  }