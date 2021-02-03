const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  } 
  
  let queue = await Bot.distube.getQueue(message)
  
  if (queue){
    Bot.distube.pause(message)
    
    message.channel.send({
      embed: {
        title: `Paused`,
        description: `Paused song`,
        color: "#0099ff",
      }
    })
  } else if (!queue){
    return
  }
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["pau"],
  mod_only: false
},
    
exports.help = {
    name: "Pause",
    description: "Pauses the current song playing.",
    usage: "",
    category: "🎵music🎵",
    cooldown: 3
}