const Discord = require("discord.js");

exports.run = async (Bot, message) => {
  message.lineReplyNoMention(`${Bot.Config.Bot.Emojis.success} | Here's my website! https://${process.env.baseURL}/bot)`)
},


  exports.config = {
    name: "Website",
    description: "I'll send my website!",
    aliases: ["web"],
    usage: "",
    category: "🧰utility🧰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5
  }