const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  if (!Bot.distube.isPlaying(message)){
    return message.channel.send("A song must be playing to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  Bot.distube.setRepeatMode(message, parseInt(Arguments[0]))
  
  message.channel.send("Okay, I'll loop this song.").then(m => m.delete({ timeout: 5000 }))
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["repeat"],
  mod_only: false
},
    
exports.help = {
  name: "Loop",
  description: "Loops the currently playing song.",
  usage: "<Repeat Mode Default Inf>",
  category: "🎵music🎵",
  cooldown: 3
}