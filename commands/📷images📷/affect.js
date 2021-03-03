const Discord = require("discord.js");

exports.run = async (Bot, message) => {
  const User = message.mentions.users.first() || Bot.users.cache.get(Arguments[0]) || message.author

  if (process.env.TestMode) {
    return
  }

  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "png"
  })

  const Image = await canvacord.Canvas.affect(Avatar)
  const Affect = new Discord.MessageAttachment(Image, "affect.gif")

  message.channel.send(Affect)
},

  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["nope"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },

  exports.help = {
    name: "Affect",
    description: "Yes it does noob",
    usage: "",
    category: "📷images📷",
    cooldown: 2
  }