const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments, Command) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  if (!Bot.distube.isPlaying(message)){
    return message.channel.send("A song must be playing to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  if (![`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(Arguments.join(" "))){
    return message.channel.send("Next time, say a filter. Filters: 3d, bassboost, echo, karaoke, nightcore, vaporwave.").then(m => m.delete({ timeout: 5000 }))
  }
  
  let filter = Bot.distube.setFilter(message, Arguments.join(" "))
  
  message.channel.send("Current queue filter: " + (filter || "Off")).then(m => m.delete({ timeout: 5000 }))
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["addfilter"],
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"]
},
    
exports.help = {
  name: "Filter",
  description: "Change what the song sounds like! Filters: 3d, bassboost, echo, karaoke, nightcore, vaporwave.",
  usage: "<Filter>",
  category: "🎵music🎵",
  cooldown: 3
}