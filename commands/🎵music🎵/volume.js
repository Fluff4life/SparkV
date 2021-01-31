const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!")
  }
  
  if (!Bot.distube.isPlaying(message)){
    return message.channel.send("A song must be playing to use this command!")
  }
  
  if (parseInt(Arguments[0]) > 200){
    return message.send("Due to performance reasons, songs cannot go louder than 200.")
  }
  
  Bot.distube.setVolume(message, parseInt(Arguments[0]))
  message.channel.send(`I set the volume to ${Arguments[0]}!`)
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["v", "set", "set-volume"],
  mod_only: false
},
    
exports.help = {
  name: "Volume",
  description: "Sets the volume of the current playing track.",
  usage: "<volume>",
  category: "🎵music🎵",
  cooldown: 3
}