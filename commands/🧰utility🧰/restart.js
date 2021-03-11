const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  if (msg.author.id !== process.env.ownerID) {
    return msg.channel.send("❌Access denied.")
  }

  msg.channel.send("Ch1llBlox is now restarting.")

  process.exit()
},

  exports.config = {
    name: "Eval",
    description: "This is an owner only command.",
    aliases: [],
    usage: "",
    category: "🧰utility🧰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5
  }