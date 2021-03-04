const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  if (!Arguments || !Arguments[0]){
    return msg.channel.send("Please provide a valid HEX color code. Example: #ff0000.")
  }

  const canvacord = require("canvacord");

  Arguments = Arguments.join(" ")

  const Image = await canvacord.Canvas.color(`#${Arguments}`)
  const Color = new Discord.MessageAttachment(Image, "color.png")

  msg.channel.send(Color)
},

exports.config = {
  name: "Color",
  description: "Hex to color.",
  aliases: [],
  usage: "<HEX>",
  category: "📷images📷",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 1.5
}