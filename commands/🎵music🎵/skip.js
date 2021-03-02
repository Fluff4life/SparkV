const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel){
    return message.channel.send("You must be in a __**voice channel**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  } 
  
  let queue = await Bot.distube.getQueue(message)
  
  if (queue){
    Bot.distube.skip(message)
    
    message.channel.send({
      embed: {
        title: `Skipped Song`,
        description: `Skipped currently playing song.`,
        color: "#0099ff",

        fields: [
          {
            name: `Skipped To`,
            value: queue.songs[1],
            inline: true
          }
        ],

        thumbnail: {
          url: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/YouTube.jpg"
        },
        
        footer: {
          text: `Skipped song`,
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
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"]
},
    
exports.help = {
  name: "Skip",
  description: "Skips to the next song in queue.",
  usage: "",
  category: "🎵music🎵",
  cooldown: 3
}