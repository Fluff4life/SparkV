const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  } 
  
  Bot.distube.play(message, Arguments.join(" "))
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: [""],
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"]
},
    
exports.help = {
  name: "Play",
  description: "Plays a song with the given name or URL.",
  usage: "<song title or URL>",
  category: "🎵music🎵",
  cooldown: 3
}