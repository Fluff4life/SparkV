const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!")
  } 
  
  let queue = await Bot.distube.getQueue(message)
  
  if (queue){
    Bot.distube.skip(message)
    
    message.channel.send({
      embed: {
        title: `Skipped Song`,
        description: `Skipped Song`,
        color: "#0099ff",
        
        footer: {
          text: `Skipped song.`,
          icon_url: process.env.bot_logo
        }
      }
    })
  } else if (!queue){
    return
  }
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["sk"],
  mod_only: false
},
    
exports.help = {
  name: "Skip",
  description: "Skip the currently playing song.",
  usage: "",
  category: "🎵music🎵",
  cooldown: 3
}