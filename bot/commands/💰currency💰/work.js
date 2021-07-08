const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  message.lineReplyNoMention(`${Bot.Config.Bot.Emojis.error} | You don't have a job noob. You have to go get one to work lol.`)
},

  exports.config = {
    name: "Work",
    description: "Work for your job and earn some Ch1llBucks.",
    aliases: ["job"],
    usage: "",
    category: "💰currency💰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 45
  }
