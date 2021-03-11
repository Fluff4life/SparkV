const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.author

  var Ch1llBucks = await Bot.Database.get(`UserData_${User.id}.ch1llbucks`)

  if (!Ch1llBucks) {
    return message.channel.send("Bruh you have no Ch1llBucks.")
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

  if (parseInt(Arguments[0]) > BankMax) {
    return message.channel.send(`You don't have enough bank space to hold ❄${Arguments[0]}!`)
  }

  if (parseInt(Arguments[0]) > Ch1llBucks) {
    return message.channel.send("You don't have enough Ch1llBucks to deposit that much into your bank.")
  }

  await Bot.Database.set(`UserData_${User.id}.ch1llbucks`, Ch1llBucks - parseInt(Arguments[0]))
  await Bot.Database.set(`UserData_${User.id}.bank`, Ch1llBucks + parseInt(Arguments[0]))

  message.channel.send(`Deposited ❄${await Bot.FormatNumber(Arguments[0])} into bank!`)
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