const Discord = require("discord.js");

exports.run = async (Bot, message) => {
  const User = message.mentions.users.first() || Bot.users.cache.get(Arguments[0]) || message.author

  if (process.env.TestMode) {
    return
  }

  const canvacord = require("canvacord");

  const Avatar = message.author.displayAvatarURL({
    dynamic: false,
    format: "png"
  })

  const UserAvatar = User.displayAvatarURL({
    dynamic: false,
    format: "png"
  })

  const Image = await canvacord.Canvas.slap(Avatar, UserAvatar)
  const Slap = new Discord.MessageAttachment(Image, "slap.gif")

  message.channel.send(Slap)
},

  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["flip"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },

  exports.help = {
    name: "Slap",
    description: "SLAP SLAP!",
    usage: "<user>",
    category: "📷images📷",
    cooldown: 2
  }