const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.users.first() || message.author

  if (!User) {
    return message.channel.send("Please say a person to rob.")
  }

  var Ch1llBucks = await Bot.Database.get(`UserData.${User.id}.ch1llbucks`)
  var Bank = await Bot.Database.get(`UserData.${User.id}.bank`)
  var BankMax = await Bot.Database.get(`UserData.${User.id}.bankmax`)

  if (!Ch1llBucks) {
    Ch1llBucks = 0
  }

  if (!BankMax) {
    BankMax = 4500
  }

  if (!Bank) {
    Bank = 0
  }

  const NetWorth = Bank + Ch1llBucks

  const BalanceEmbed = new Discord.MessageEmbed()
    .setTitle(`**${User.tag}'s Balance**`)
    .setDescription(`Wallet: ❄${await Bot.FormatNumber(Ch1llBucks)}\nBank: ❄${await Bot.FormatNumber(Bank)}/${await Bot.FormatNumber(BankMax)}\nNet Worth: ${await Bot.FormatNumber(NetWorth)}`)
    .setColor(Bot.Config.Embed.EmbedColor)
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