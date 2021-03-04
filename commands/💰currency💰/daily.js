const Discord = require("discord.js");
const ms = require("parse-ms")

exports.run = async (Bot, message, Arguments) => {
  const User = message.author
  const Timeout = 86400
  const RandomAmmount = Math.floor(Math.random() * 2500) + 1

  var Ch1llBucks = await Bot.Database.get(`UserData_${User.id}.ch1llbucks`)
  var Multiplier = await Bot.Database.get(`UserData_${User.id}.multiplier`)
  var Daily = await Bot.Database.get(`UserData_${User.id}.daily`)

  if (!Multiplier){
    Multiplier = 1
  }

  if (!Ch1llBucks){
    Ch1llBucks = 0
  }

  const Ammount = RandomAmmount * Multiplier

  if (Daily !== null && Timeout - (Date.now() - Daily) > 0){
    // Cooldown here

    const Time = ms(Timeout - (Date.now() - Daily))
  }

  await Bot.Database.subtract(`UserData_${User.id}.ch1llbucks`, Ammount)
  await Bot.Database.add(`UserData_${User.id}.bank`, Ammount)

  message.channel.send(`Deposited ❄${parseInt(Arguments[0])} into bank!`)
},

  exports.config = {
    name: "Daily",
    description: "error 503",
    aliases: ["dep"],
    usage: "",
    category: "💰currency💰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: false,
    cooldown: 45
  }