const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  var Ch1llBucks = await Bot.Database.get(`UserData_${message.author.id}.ch1llbucks`)
  var BankMax = await Bot.Database.get(`UserData_${message.author.id}.bankmax`)

  if (!Ch1llBucks){
    Ch1llBucks = 0
  }

  if (!BankMax) {
    BankMax = 4500
  }

  if (!Arguments) {
    return message.channel.send("You need to tell me how much you want me to deposit. You can say all if you want all of your Ch1ll Bucks in your bank.")
  }

  if (Arguments[0].toLowerCase() === "all") {
    if (Ch1llBucks === 0 || Ch1llBucks === null) {
      return message.channel.send("You have no Ch1llBucks!")
    }

    await Bot.Database.add(`UserData_${message.author.id}.bank`, Ch1llBucks)
    await Bot.Database.subtract(`UserData_${message.author.id}.ch1llbucks`, Ch1llBucks)

    message.channel.send(`You just deposited ❄${await Bot.FormatNumber(Arguments[0])} into your bank!`)
  } else {
    if (!Arguments[0]) {
      return message.channel.send("lol you can't deposit nothing.")
    }

    if (isNaN(Arguments[0])) {
      return message.channel.send("Bruh please say a number.")
    }

    if (message.content.includes("-")) {
      return message.channel.send("You can't deposit negitive Ch1llBucks lol.")
    }

    if (Ch1llBucks < Arguments[0]) {
      return message.channel.send("You don't have that much money.")
    }

    if (BankMax < Arguments[0]) {
      return message.channel.send(`You don't have enough bank space to hold ❄${Arguments[0]}!`)
    }

    await Bot.Database.subtract(`UserData_${message.author.id}.ch1llbucks`, parseInt(Arguments[0]))
    await Bot.Database.add(`UserData_${message.author.id}.bank`, parseInt(Arguments[0]))

    message.channel.send(`Deposited ❄${await Bot.FormatNumber(Arguments[0])} into bank!`)
  }
},


  exports.config = {
    name: "Deposit",
    description: "Deposit your Ch1llBucks into your bank.",
    aliases: ["dep"],
    usage: "",
    category: "💰currency💰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 45
  }