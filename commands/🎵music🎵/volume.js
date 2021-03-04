const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  if (!Bot.distube.isPlaying(message)){
    return message.channel.send("A song must be playing to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  if (parseInt(Arguments[0]) > 100){
    return message.send("Due to performance reasons, songs cannot go louder than 100.").then(m => m.delete({ timeout: 5000 }))
  }
  
  Bot.distube.setVolume(message, parseInt(Arguments[0]))
  message.channel.send(`I set the volume to ${Arguments[0]}!`)
},

exports.config = {
  name: "Volume",
  description: "Sets the volume of the currently playing track.",
  aliases: ["vol"],
  usage: "",
  category: "🎵music🎵",
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  member_permissions: [],
  enabled: true,
  cooldown: 3
}