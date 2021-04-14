const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (message.author.id !== process.env.OwnerID) {
    return message.lineReplyNoMention("❌Access denied.")
  }

  const User = message.mentions.users.first()
  var Ch1llBucks = await Bot.Database.get(`${User.id}.ch1llbucks`)

  if (!Ch1llBucks){
    Ch1llBucks = 0
  }

  await Bot.Database.set(`${User.id}.ch1llbucks`, parseInt(Arguments[1]))

  message.lineReplyNoMention(`Success.`)
},

exports.config = {
  name: "SetCh1llBucks",
  description: "Set someone's Ch1llBucks!",
  aliases: [],
  usage: "<user> <ammount>",
  category: "👑owner👑",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 15
}