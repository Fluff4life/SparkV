const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  var Ch1llBucks = await Bot.Database.get(`UserData_${message.author.id}.ch1llbucks`)
  var Bank = await Bot.Database.get(`UserData_${message.author.id}.bank`)

  if (!Ch1llBucks){
    Ch1llBucks = 0
  }

  if (!Bank) {
    Bank = 4500
  }

  if (!Arguments) {
    return message.channel.send("You need to tell me how much you want me to withdraw. You can say all if you want all of your Ch1ll Bucks from the bank into your wallet.")
  }

  if (Arguments[0].toLowerCase() === "all") {
    if (Bank === 0 || Bank === null) {
      return message.channel.send("You have no Ch1llBucks!")
    }

    await Bot.Database.subtract(`UserData_${message.author.id}.bank`, Ch1llBucks)
    await Bot.Database.add(`UserData_${message.author.id}.ch1llbucks`, Ch1llBucks)

    message.channel.send(`You just withdrawed ❄${await Bot.FormatNumber(Arguments[0])} from your bank!`)
  } else {
    if (!Arguments[0]) {
      return message.channel.send("lol you can't withdraw nothing.")
    }

    if (isNaN(Arguments[0])) {
      return message.channel.send("Bruh please say a number.")
    }

    if (message.content.includes("-")) {
      return message.channel.send("You can't withdraw negitive Ch1llBucks lol.")
    }

    if (Bank < Arguments[0]) {
      return message.channel.send("You don't have that much Ch1llBucks in your bank!")
    }

    await Bot.Database.add(`UserData_${message.author.id}.ch1llbucks`, parseInt(Arguments[0]))
    await Bot.Database.subtract(`UserData_${message.author.id}.bank`, parseInt(Arguments[0]))

    message.channel.send(`Withdrawed ❄${await Bot.FormatNumber(Arguments[0])} from your bank!`)
  }
},


exports.config = {
  name: "Withdraw",
  description: "Withdraw your Ch1llBucks in your bank into your wallet.",
  aliases: ["with"],
  usage: "",
  category: "💰currency💰",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 45
}