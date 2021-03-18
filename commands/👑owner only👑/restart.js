const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (message.author.id !== Bot.Config.Owner.ID) {
    return message.channel.send("❌Access denied.")
  }

  message.channel.send("Ch1llBlox is now restarting.")

  process.exit()
},

  exports.config = {
    name: "Restart",
    description: "This is an owner only command.",
    aliases: [],
    usage: "",
    category: "👑owner only👑",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 5
  }