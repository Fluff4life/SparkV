const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.users.first() || Bot.users.cache.get(Arguments[0]) || message.author

  if (Bot.Config.Debug === true) {
    return
  }

  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "png"
  })

  const Image = await canvacord.Canvas.jail(Avatar, true)
  const Jail = new Discord.MessageAttachment(Image, "jail.png")

  message.lineReplyNoMention(Jail)
},

  exports.config = {
    name: "Jail",
    description: "Haha get in jail noob",
    aliases: ["lockup"],
    usage: "<optional user>",
    category: "📷images📷",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 2
  }