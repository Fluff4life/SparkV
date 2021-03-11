const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (process.env.Debug) {
    return
  }

  if (!Arguments || !Arguments[0]) {
    return message.channel.send("Please provide text.")
  }

  const canvacord = require("canvacord");

  Arguments = Arguments.join(" ")

  const Image = await canvacord.Canvas.changemymind(Arguments)
  const ChangeMyMind = new Discord.MessageAttachment(Image, "changemymind.png")

  message.channel.send(ChangeMyMind)
},

  exports.config = {
    name: "ChangeMyMind",
    description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAH!",
    aliases: ["cmm"],
    usage: "<text>",
    category: "📷images📷",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 2
  }