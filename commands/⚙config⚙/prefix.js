const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!Arguments[0]) {
    return message.channel.send("You have to tell me the prefix lol.").then(m => m.delete({ timeout: 5000 }))
  }

  if (Arguments[0].length > 5) {
    return message.channel.send("Your new prefix must be under 5 characters.").then(m => m.delete({ timeout: 5000 }))
  }

  Bot.Database.set(`ServerData.${message.guild.id}.Prefix`, Arguments[0])
  message.channel.send(`Prefix has successfully been changed to **${Arguments[0]}**!`)
},

exports.config = {
  name: "Prefix",
  description: "I'll set the prefix for your server to what you'd like.",
  aliases: ["nourl"],
  usage: "<prefix>",
  category: "⚙config⚙",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  member_permissions: ["ADMINISTRATOR"],
  enabled: true,
  cooldown: 2.5
}