const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.users.first() || Bot.users.cache.get(Arguments[0]) || message.author

  if (Bot.Config.Debug.Enabled === true) {
    return
  }

  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "png"
  })

  const Image = await canvacord.Canvas.wasted(Avatar)
  const Wasted = new Discord.MessageAttachment(Image, "wasted.png")

  message.lineReplyNoMention(Wasted)
},

  exports.config = {
    name: "Wasted",
    description: "Bruh wasted!",
    aliases: [],
    usage: "<optional user>",
    category: "📷images📷",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 2
  }