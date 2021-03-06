const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  } 
  
  let queue = await Bot.distube.getQueue(message)
  
  if (queue){
    Bot.distube.resume(message)
    
    message.channel.send({
      embed: {
        title: `Resumed`,
        description: `Resumed song`,
        color: "#0099ff",
      }
    })
  } else if (!queue){
    return
  }
},

exports.config = {
  name: "Resume",
  description: "Resume playing the current song.",
  aliases: [],
  usage: "",
  category: "🎵music🎵",
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  member_permissions: [],
  enabled: false,
  cooldown: 3
}