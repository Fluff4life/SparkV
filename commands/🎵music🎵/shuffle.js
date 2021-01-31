const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!")
  }
  
  if (!Bot.distube.isPlaying(message)){
    return message.channel.send("A song must be playing to use this command!")
  }
  
  Bot.distube.shuffle(message)
  
  message.channel.send("Okay, I'll shuffle the queue.")
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["shuff"],
  mod_only: false
},
    
exports.help = {
  name: "Loop",
  description: "Shuffles the queue",
  usage: "",
  category: "🎵music🎵",
  cooldown: 3
}