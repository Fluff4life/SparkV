const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.author

  var Ch1llBucks = await Bot.Database.get(`UserData_${User.id}.ch1llbucks`)
  var BankMax = await Bot.Database.get(`UserData_${User.id}.bankmax`)

  if (!Ch1llBucks) {
    return message.channel.send("Bruh you have no Ch1llBucks.")
  }

  if (!BankMax) {
    BankMax = 4500
  }

  if (!Arguments) {
    return message.channel.send("You need to tell me how much you want me to deposit. You can say all if you want all of your Ch1ll Bucks in your bank.")
  }

  if (message.content.includes("-")) {
    return message.channel.send("You can't deposit negitive Ch1llBucks lol.")
  }

  if (!parseInt(Arguments[0])) {
    return message.channel.send("Bruh please say a number.")
  }

  console.log(Arguments[0])

  if (parseInt(Arguments[0]) > BankMax) {
    return message.channel.send(`You don't have enough bank space to hold ❄${Arguments[0]}!`)
  }

  if (parseInt(Arguments[0]) > Ch1llBucks) {
    return message.channel.send("You don't have enough Ch1llBucks to deposit that much into your bank.")
  }

  await Bot.Database.add(`UserData_${User.id}.bank`, parseInt(Arguments[0]))
  await Bot.Database.subtract(`UserData_${User.id}.ch1llbucks`, parseInt(Arguments[0]))

  message.channel.send(`Deposited ❄${Arguments[0]} into bank!`)
},

  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["dep"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },

  exports.help = {
    name: "Deposit",
    description: "Deposit your Ch1llBucks into your bank.",
    usage: "<optional user>",
    category: "💰currency💰",
    cooldown: 2.0
  }