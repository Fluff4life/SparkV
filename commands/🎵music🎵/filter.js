const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments, Command) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!")
  }
  
  if (!Bot.distube.isPlaying(message)){
    return message.channel.send("A song must be playing to use this command!")
  }
  
  if (![`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(Arguments.join(" "))){
    return message.channel.send("Next time, say a filter. Filters: 3d, bassboost, echo, karaoke, nightcore, vaporwave.")
  }
  
  let filter = Bot.distube.setFilter(message, Arguments.join(" "))
  
  message.channel.send("Current queue filter: " + (filter || "Off"))
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["f"],
  mod_only: false
},
    
exports.help = {
  name: "Filter",
  description: "Change what the song sounds like! Filters: 3d, bassboost, echo, karaoke, nightcore, vaporwave.",
  usage: "<Type of Filter>",
  category: "🎵music🎵",
  cooldown: 3
}