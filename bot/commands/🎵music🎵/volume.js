const Discord = require(`discord.js`);

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | You must be in a __**voice channel**__ to use this command!`).then(m => m.delete({ timeout: 5000 }))
  }
 
  if (!Bot.distube.isPlaying(message)){
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | A song must be playing to use this command!`).then(m => m.delete({ timeout: 5000 }))
  }

  if (isNaN(Arguments[0])){
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | That's not a valid number!`)
  }
  
  if (parseInt(Arguments[0]) > 100){
    return message.send(`${Bot.Config.Bot.Emojis.error} | Due to performance reasons, songs cannot go louder than 100.`).then(m => m.delete({ timeout: 5000 }))
  }
  
  Bot.distube.setVolume(message, parseInt(Arguments[0])).then(() => message.lineReplyNoMention(`${Bot.Config.Bot.Emojis.music} | I set the volume to ${Arguments[0]}!`)).catch(err => message.lineReply(`${Bot.Config.Bot.Emojis.error} | Uh oh! An error occured.`))
},

exports.config = {
  name: `Volume`,
  description: `Sets the volume of the currently playing track.`,
  aliases: [`v`, `setvolume`],
  usage: ``,
  category: `🎵music🎵`,
  bot_permissions: [`SEND_MESSAGES`, `READ_MESSAGE_HISTORY`, `EMBED_LINKS`, `VIEW_CHANNEL`, `CONNECT`, `SPEAK`],
  member_permissions: [],
  enabled: true,
  cooldown: 5
}