const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  if (!Bot.distube.isPlaying(message)){
    return message.channel.send("A song must be playing to use this command!").then(m => m.delete({ timeout: 5000 }))
  }

  const Queue = Bot.distube.getQueue(message)
  var mode
  
  if (Arguments[0].toLowerCase() === "song"){
    mode = 1
  } else if (Arguments[0].toLowerCase() === "queue") {
    mode = 2
  } else {
    mode = 0
  }

  mode = Bot.distube.setRepeatMode(message, mode)
  mode = mode ? mode === 2 ? "Repeat the Queue" : "Repeat the currently playing Song" : "turn repeat mode off"
   
  message.channel.send(`Okay, I'll ${mode}.`).then(m => m.delete({ timeout: 5000 }))
},

exports.config = {
  name: "Repeat",
  description: "Replays the currently playing song.",
  aliases: ["replay", "loop"],
  usage: "<Optional amount of times - default inf>",
  category: "🎵music🎵",
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  member_permissions: [],
  enabled: true,
  cooldown: 5
}