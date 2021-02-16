const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments, Command) => {
  if(!message.member.hasPermision("ADMINISTRATOR")){
    return message.channel.send("This command requires Admin to change!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  if (!Bot.distube.isPlaying(message)){
    return message.channel.send("A song must be playing to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
 let Mode = Bot.distube.toggleAutoplay(message)
    message.channel.send("Okay, I just set AutoPlay " + (Mode ? "On" : "Off") + ".").then(m => m.delete({ timeout: 5000 }))
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["ap"],
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"]
},
    
exports.help = {
  name: "AutoPlay",
  description: "Sets AutoPlay. Requires Administrator.",
  usage: "<Toggle>",
  category: "🎵music🎵",
  cooldown: 3
}