const Discord = require("discord.js");

exports.run = async (Bot, message) => {
  const User = message.mentions.users.first() || Bot.users.cache.get(Arguments[0]) || message.author

  if (Bot.Config.Debug === true) {
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
  const Slap = new Discord.MessageAttachment(Image, "slap.png")

  message.channel.send(Slap)
},

exports.config = {
  name: "Slap",
  description: "SLAP SLAP SLAP!",
  aliases: ["punch"],
  usage: "<optional user>",
  category: "📷images📷",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 2
}