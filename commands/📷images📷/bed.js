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

  const Image = await canvacord.Canvas.bed(Avatar, UserAvatar)
  const Bed = new Discord.MessageAttachment(Image, "bed.gif")

  message.channel.send(Bed)
},

  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["underbed"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },

  exports.help = {
    name: "Bed",
    description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH!!!!",
    usage: "",
    category: "📷images📷",
    cooldown: 2
  }