const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  message.channel.send("You don't have a job noob. You have to go get one to work lol.")
},

  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["job"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },

  exports.help = {
    name: "Work",
    description: "Work for your job and earn some Ch1llBucks.",
    usage: "",
    category: "💰currency💰",
    cooldown: 2.0
  }