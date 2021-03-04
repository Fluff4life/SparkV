const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!Arguments[0]) {
    return message.channel.send("You have to tell me to turn it on or off lol.").then(m => m.delete({ timeout: 5000 }))
  }

  Arguments = Arguments
    .join(" ")
    .toLowerCase()

  console.log(Arguments)
  if (!Arguments == "on") {
    return message.channel.send("AntiSpam can only turn on and off right now.").then(m => m.delete({ timeout: 5000 }))
  } else if (!Arguments == "off") {
    return message.channel.send("AntiSpam can only turn on and off right now.").then(m => m.delete({ timeout: 5000 }))
  }

  Bot.Database.set(`ServerData_${message.guild.id}.AntiSpam`, Arguments)
  message.channel.send(`AntiSpam is now ${Arguments}.`)
},

exports.config = {
  name: "🆕AntiSpam",
  description: "Stop spammers. Right now, you can only turn on and off.",
  aliases: ["nospam"],
  usage: "<on or off>",
  category: "⚙config⚙",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  member_permissions: ["ADMINISTRATOR"],
  enabled: true,
  cooldown: 2.5
}