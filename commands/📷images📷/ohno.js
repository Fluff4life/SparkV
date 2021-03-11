const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (process.env.Debug) {
    return
  }

  const canvacord = require("canvacord");

  Arguments = Arguments.join(" ")

  const Image = await canvacord.Canvas.ohno(Arguments)
  const OhNo = new Discord.MessageAttachment(Image, "ohno.png")

  message.channel.send(OhNo)
},

  exports.config = {
    name: "OhNo",
    description: "OH NO HE'S STUPID!",
    aliases: ["stupid"],
    usage: "<text>",
    category: "📷images📷",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 2
  }