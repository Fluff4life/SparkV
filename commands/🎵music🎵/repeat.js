const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.lineReplyNoMention("You must be in a __**voice channel**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  if (!Bot.distube.isPlaying(message)){
    return message.lineReplyNoMention("A song must be playing to use this command!").then(m => m.delete({ timeout: 5000 }))
  }

  const Queue = Bot.distube.getQueue(message)
  var mode
  
  if (Arguments[0].toLowerCase() === "song"){
    mode = 1
  } else if (Arguments[0].toLowerCase() === "queue"){
    if (!Queue){
      return message.lineReplyNoMention("There must be more than 2 songs in the queue to use this command!").then(m => m.delete({ timeout: 5000 }))
    }

    mode = 2
  } else {
    mode = 0
  }

  mode = Bot.distube.setRepeatMode(message, mode)
  mode = mode ? mode === 2 ? "repeat the Queue" : "repeat the currently playing song" : "turn repeat mode off"
   
  message.lineReplyNoMention(`Okay, I'll ${mode}.`)
},

exports.config = {
  name: "Repeat",
  description: "Replays the currently playing song.",
  aliases: ["replay", "loop"],
  usage: "<song or queue. Leave empty to deactivate.>",
  category: "🎵music🎵",
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  member_permissions: [],
  enabled: true,
  cooldown: 5
}