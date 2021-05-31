const Discord = require(`discord.js`);

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.lineReply(`${Bot.Config.Emojis.error} | You must be in a __**voice channel**__ to use this command!`).then(m => m.delete({ timeout: 5000 }))
  } 
  
  let queue = await Bot.distube.getQueue(message)
  
  if (!queue){
    return message.lineReply(`${Bot.Config.Emojis.error} | No songs was ever/still is paused.`)
  }

  Bot.distube.resume(message).then(() => {
    message.lineReplyNoMention({
      embed: {
        title: `${Bot.Config.Emojis.music} | Resumed`,
        description: `Resumed song`,
        color: `#0099ff`,
      }
    })
  })
},

exports.config = {
  name: `Resume`,
  description: `Resume playing the current song.`,
  aliases: [`unpause`],
  usage: ``,
  category: `🎵music🎵`,
  bot_permissions: [`SEND_MESSAGES`, `READ_MESSAGE_HISTORY`, `EMBED_LINKS`, `VIEW_CHANNEL`, `CONNECT`, `SPEAK`],
  member_permissions: [],
  enabled: true,
  cooldown: 5
}