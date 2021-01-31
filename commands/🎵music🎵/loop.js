const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!")
  }
  
  if (!Bot.distube.isPlaying(message)){
    return message.channel.send("A song must be playing to use this command!")
  }
  
  Bot.distube.setRepeatMode(message, parseInt(Arguments[0]))
  
  message.channel.send("Okay, I'll loop this song.")
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