const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!Arguments[0]) {
    return message.channel.send("You have to tell me to turn it on or off lol.").then(m => m.delete({ timeout: 5000 }))
  }

  if (Arguments[0].toLowerCase() === "on") {
    Bot.Database.set(`ServerData.${message.guild.id}.AntiURL`, Arguments[0])
    message.channel.send(`AntiURL is now ${Arguments[0]}.`)
  } else if (Arguments[0].toLowerCase() === "off") {
    Bot.Database.set(`ServerData.${message.guild.id}.AntiURL`, Arguments[0])
    message.channel.send(`AntiURL is now ${Arguments[0]}.`)
  } else {
    message.channel.send(`Unknown on or off value. Right usage would be (your prefix)AntiURL <on or off>.`)
  }
},

  exports.config = {
    name: "AntiURL",
    description: "If someone sends a link, Ch1llBlox will delete it. You can only turn on and off.",
    aliases: ["nourl"],
    usage: "<on or off>",
    category: "⚙config⚙",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    member_permissions: ["ADMINISTRATOR"],
    enabled: true,
    cooldown: 2.5
  }