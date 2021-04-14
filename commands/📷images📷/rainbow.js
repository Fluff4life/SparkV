const Discord = require("discord.js");

exports.run = async (Bot, message) => {
  const User = message.mentions.users.first() || Bot.users.cache.get(Arguments[0]) || message.author

  if (Bot.Config.Debug === true) {
    return
  }

  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "png"
  })

  const Image = await canvacord.Canvas.opinion(Avatar)
  const Rainbow = new Discord.MessageAttachment(Image, "raindow.png")

  message.lineReplyNoMention(Rainbow)
},

  exports.config = {
    name: "Rainbow",
    description: "E",
    aliases: ["colorful"],
    usage: "<optional user>",
    category: "📷images📷",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 2
  }