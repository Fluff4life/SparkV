const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send("You don't have permision to run this command!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!Arguments[0]) {
    return message.channel.send("You have to tell me the prefix lol.").then(m => m.delete({ timeout: 5000 }))
  }

  if (Arguments[0].length > 5) {
    return message.channel.send("Your new prefix must be under 5 characters.").then(m => m.delete({ timeout: 5000 }))
  }

  Bot.Database.set(`ServerData_${message.guild.id}.Prefix`, Arguments[0])
  message.channel.send(`Prefix has successfully been changed to **${Arguments[0]}**!`)
},

  exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["pre"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS"]
  },

  exports.help = {
    name: "Prefix",
    description: "I will set the server's Prefix to your choice.",
    usage: "<new prefix>",
    category: "⚙config⚙",
    cooldown: 2.5
  }