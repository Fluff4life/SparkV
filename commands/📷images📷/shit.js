const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (process.env.TestMode) {
    return
  }

  if (!Arguments || !Arguments[0]) {
    return message.channel.send("Please provide text.")
  }

  const canvacord = require("canvacord");

  Arguments = Arguments.join(" ")

  const Image = await canvacord.Canvas.shit(Arguments)
  const Shit = new Discord.MessageAttachment(Image, "shit.png")

  message.channel.send(Shit)
},

  exports.config = {
    name: "Shit",
    description: "Ewwwwww!",
    aliases: ["crap"],
    usage: "<text>",
    category: "📷images📷",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 2
  }