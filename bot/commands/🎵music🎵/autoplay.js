const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments, Command) => {
  if (!message.member.voice.channel){
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | You must be in a __**voice channel**__ to use this command!`).then(m => m.delete({ timeout: 5000 }))
  }
  
  if (!Bot.distube.isPlaying(message)){
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | A song must be playing to use this command!`).then(m => m.delete({ timeout: 5000 }))
  }
  
  let Mode = Bot.distube.toggleAutoplay(message)
  message.lineReplyNoMention(`${Bot.Config.Bot.Emojis.music} | Okay, I just set AutoPlay ` + (Mode ? "On" : "Off") + ".").then(m => m.delete({ timeout: 5000 }))
},

exports.config = {
  name: "AutoPlay",
  description: "Sets AutoPlay. Requires Administrator.",
  aliases: ["autoplay"],
  usage: "<Toggle>",
  category: "🎵music🎵",
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  member_permissions: ["ADMINISTRATOR"],
  enabled: true,
  cooldown: 5
}