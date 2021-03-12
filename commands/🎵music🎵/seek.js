const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  if (!Bot.distube.isPlaying(message)){
    return message.channel.send("A song must be __**playing**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  Bot.distube.seek(message, parseInt(Arguments[0]))
},

exports.config = {
  name: "Seek",
  description: "Change the current track's position.",
  aliases: [],
  usage: "<number>",
  category: "🎵music🎵",
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  member_permissions: [],
  enabled: true,
  cooldown: 5
}