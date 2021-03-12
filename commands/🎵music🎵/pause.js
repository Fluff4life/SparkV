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
  name: "Pause",
  description: "Pauses the current song playing.",
  aliases: ["softstop"],
  usage: "",
  category: "🎵music🎵",
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  member_permissions: [],
  enabled: true,
  cooldown: 5
}