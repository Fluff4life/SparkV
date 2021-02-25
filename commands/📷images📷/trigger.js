const Discord = require("discord.js");
const canva = require("canvacord");

exports.run = async (Bot, message) => {
    const Avatar = message.author.displayAvatarURL({
        dynamic: false,
        format: "png"
    })

    const Image = await canva.trigger(Avatar)
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