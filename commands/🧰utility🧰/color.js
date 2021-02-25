const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  if (!Arguments || !Arguments[0]){
    return message.channel.send("Please provide a valid HEX color code. Example: #ff0000.")
  }

  Arguments = Arguments.join(" ")

  const Image = await canva.color(`#${Arguments}`)
  const Color = new Discord.MessageAttachment(Image, "color.png")

  message.channel.send(Color)
},
  
  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["math"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },
  
  exports.help = {
    name: "Calculate",
    description: "I'll calculate an answer to a math problem.",
    usage: "",
    category: "🧰utility🧰",
    cooldown: 1.5
  }