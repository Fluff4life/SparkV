const Discord = require("discord.js");

exports.run = async (Bot, message) => {
  if (process.env.TestMode) {
    return
  }

  const canvacord = require("canvacord");

  const Avatar = message.author.displayAvatarURL({
    dynamic: false,
    format: "png"
  })

  const Image = await canvacord.Canvas.trigger(Avatar)
  const Triggered = new Discord.MessageAttachment(Image, "triggered.gif")

  message.channel.send(Triggered)
},

  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["mad"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },

  exports.help = {
    name: "Trigger",
    description: "Wow you are very angry!",
    usage: "",
    category: "📷images📷",
    cooldown: 2
  }