const Discord = require("discord.js");
const canva = require("canvacord");

exports.run = async (Bot, message, Arguments) => {
    if (!Arguments || !Arguments[0]){
      return message.channel.send("Please provide text.")
    }

    Arguments = Arguments.join()

    const Image = await canva.changemymind(Arguments)
    const ChangeMyMind = new Discord.MessageAttachment(Image, "changemymind.png")

    message.channel.send(ChangeMyMind)
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["cmm"],
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
},
  
exports.help = {
  name: "ChangeMyMind",
  description: "Change my mind meme.",
  usage: "<text>",
  category: "📷images📷",
  cooldown: 2
}