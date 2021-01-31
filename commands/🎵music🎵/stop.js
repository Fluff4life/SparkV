const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!")
  } 
  
  let queue = await Bot.distube.getQueue(message)
  
  if (queue){
    Bot.distube.stop(message)
    
    message.channel.send({
      embed: {
        title: `Stopped`,
        description: `Stopped song`,
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
  aliases: ["st"],
  mod_only: false
},
    
exports.help = {
    name: "Stop",
    description: "Disconnects me from the voice channel it is in and removes all songs in queue.",
    usage: "",
    category: "🎵music🎵",
    cooldown: 3
}