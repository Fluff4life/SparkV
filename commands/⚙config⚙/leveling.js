const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!Arguments[0]) {
    return message.channel.send("You have to tell me to turn it on or off lol.").then(m => m.delete({ timeout: 5000 }))
  }

  if (Arguments[0].toLowerCase() === "on") {
    Bot.Database.set(`ServerData.${message.guild.id}.Leveling`, Arguments[0])
    message.channel.send(`Leveling is now ${Arguments[0]}.`)
  } else if (Arguments[0].toLowerCase() === "off") {
    Bot.Database.set(`ServerData.${message.guild.id}.Leveling`, Arguments[0])
    message.channel.send(`Leveling is now ${Arguments[0]}.`)
  } else {
    message.channel.send(`Unknown on or off value. Right usage would be (your prefix)Leveling <on or off>.`)
  }
},

  exports.config = {
    name: "🆕Leveling",
    description: "When on, Ch1llBlox will reward people with xp and when at max, turns into a level. The higher the level you have in that server, the more of a multiplier you have. To prevent spam, I recommend you enable AntiSpam before activating this.",
    aliases: [],
    usage: "<on or off>",
    category: "⚙config⚙",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    member_permissions: ["ADMINISTRATOR"],
    enabled: true,
    cooldown: 2.5
  }