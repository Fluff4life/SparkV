const Discord = require("discord.js");

exports.run = async (Bot, message) => {
  message.lineReplyNoMention("[Click here to view my dashboard!](https://ch1llblox.botdash.pro/)")
},


  exports.config = {
    name: "Dashboard",
    description: "I'll send my dashboard!",
    aliases: ["dash"],
    usage: "",
    category: "🧰utility🧰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5
  }