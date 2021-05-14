const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments, Command) => {
  if (!message.member.voice.channel){
    return message.lineReply("You must be in a __**voice channel**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  if (!Bot.distube.isPlaying(message)){
    return message.lineReply("A song must be playing to use this command!").then(m => m.delete({ timeout: 5000 }))
  }

  const Queue = Bot.distube.getQueue(message)

  if (Arguments[0].toLowerCase() === "off" && Queue.filter){
    Bot.distube.setFilter(message, Queue.filter).then(() => {
      return message.lineReply("Okay, I turned off the filter.")
    })
  } else if (Object.keys(Bot.distube.filters).includes(Arguments[0])){
    Bot.distube.setFilter(message, Arguments[0]).then(() => {
      return message.lineReply(`Okay, I turned on filter ${Arguments[0]}.`)
    })
  } else {
    return message.lineReply("That's not a valid filter!")
  }
},

exports.config = {
  name: "Filter",
  description: "Change what the song sounds like! Filters: 3d, bassboost, echo, karaoke, nightcore, vaporwave. Requires admin to prevent abuse.",
  aliases: ["setfilter"],
  usage: "<Filter>",
  category: "🎵music🎵",
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  member_permissions: ["ADMINISTRATOR"],
  enabled: true,
  cooldown: 5
}