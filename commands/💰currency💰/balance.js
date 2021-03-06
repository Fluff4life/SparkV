const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.users.first() || message.author

  var Ch1llBucks = await Bot.Database.get(`UserData_${User.id}.ch1llbucks`)
  var Bank = await Bot.Database.get(`UserData_${User.id}.bank`)
  var BankMax = await Bot.Database.get(`userData_${User.id}.bankmax`)

  if (!Ch1llBucks){
    Ch1llBucks = 0
  }

  if (!BankMax){
    BankMax = 4500
  }

  if (!Bank){
    Bank = 0
  }

  const NetWorth = Bank + Ch1llBucks

  const BalanceEmbed = new Discord.MessageEmbed()
    .setTitle(`**${User}'s Balance**`)
    .setDescription(`Wallet: ❄${Bot.FormatNumber(Ch1llBucks)}\nBank: ❄${Bot.FormatNumber(Bank)}/${Bot.FormatNumber(BankMax)}\nNet Worth: ${Bot.FormatNumber(NetWorth)}`)
    .setColor("#0099ff")
    .setTimestamp()

  message.channel.send(BalanceEmbed)
},

exports.config = {
  name: "Balance",
  description: "View your balance.",
  aliases: ["bal"],
  usage: "<optional user>",
  category: "💰currency💰",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 2
}