const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.users.first() || Bot.users.cache.get(Arguments[0]) || message.author

  var Ch1llBucks = await Bot.Database.get(`UserData_${user.id}.ch1llbucks`)
  var Bank = await Bot.Database.get(`UserData_${user.id}.bank`)

  if (!Ch1llBucks){
    Ch1llBucks = 0
  }

  if (!Bank){
    Bank = 0
  }

  const BalanceEmbed = new Discord.MessageEmbed()
    .setTitle(`**${User}'s Balance**`)
    .setDescription(`Wallet: ❄${Ch1llBucks}\nBank: ❄${Bank}\nNet Worth: ${Ch1llBucks + Bank}`)
    .setColor("#0099ff")
    .setTimestamp()

  message.channel.send(BalanceEmbed)
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["bal"],
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
},
  
exports.help = {
  name: "Balance",
  description: "View your balance.",
  usage: "<optional user>",
  category: "💰currency💰",
  cooldown: 2
}