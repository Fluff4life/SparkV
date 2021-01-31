const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  let queue = Bot.distube.getQueue(message)
  
  if (queue){
    message.channel.send({
      embed: {
        title: `Queue for ${message.guild.name}`,
        description: queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - ${song.formattedDuration}`).slice(0, 10).join("\n"),
        color: "#0099ff",
      
        thumbnail: {
          url: message.author.displayAvatarURL({ dynamic: true })
        },
        
        footer: {
          text: `Displaying music queue.`,
          icon_url: process.env.bot_logo
        },
      }
    })
  } else {
    message.channel.send({
      embed: {
        title: `Queue for ${message.guild.name}`,
        description: `Nothing in queue!`,
        color: "#0099ff",
        
        thumbnail: {
          url: message.author.displayAvatarURL({ dynamic: true })
        },
      
        footer: {
          text: `Displaying music queue.`,
          icon_url: process.env.bot_logo
        },
      }
    })
  }
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["que"],
  mod_only: false
},
    
exports.help = {
  name: "Queue",
  description: "Shows the songs in queue.",
  usage: "",
  category: "🎵music🎵",
  cooldown: 3
}