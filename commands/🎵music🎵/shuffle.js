const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  if (!Bot.distube.isPlaying(message)){
    return message.channel.send("A song must be playing to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  Bot.distube.shuffle(message)
  
  message.channel.send("Okay, I'll shuffle the queue.")
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["shuff"],
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"]
},
    
exports.help = {
  name: "Loop",
  description: "Shuffles the queue",
  usage: "",
  category: "🎵music🎵",
  cooldown: 3
}