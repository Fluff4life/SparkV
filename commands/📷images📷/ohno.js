const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.users.first() || Bot.users.cache.get(Arguments[0]) || message.author

  if (process.env.TestMode) {
    return
  }

  const canvacord = require("canvacord");

  Arguments = Arguments.join(" ")

  const Image = await canvacord.Canvas.ohno(Arguments)
  const OhNo = new Discord.MessageAttachment(Image, "ohno.png")

  message.channel.send(OhNo)
},

  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["cmm"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },

  exports.help = {
    name: "ChangeMyMind",
    description: "Change my mind meme.",
    usage: "<text>",
    category: "📷images📷",
    cooldown: 2
  }