const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.users.first() || Bot.users.cache.get(Arguments[0]) || message.author

  if (process.env.TestMode) {
    return
  }

  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "png"
  })

  const Image = await canvacord.Canvas.jail(Avatar, true)
  const Jail = new Discord.MessageAttachment(Image, "jail.png")

  message.channel.send(Jail)
},

  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["lock"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },

  exports.help = {
    name: "Jail",
    description: "Haha get in jail noob",
    usage: "<user or self>",
    category: "📷images📷",
    cooldown: 2
  }