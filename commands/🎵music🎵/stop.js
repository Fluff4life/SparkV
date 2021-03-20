const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.voice.channel) {
    return message.channel.send("You must be in a __**voice channel**__ to use this command!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!Bot.distube.isPlaying(message)) {
    return message.channel.send("A song must be playing to use this command!").then(m => m.delete({ timeout: 5000 }))
  }

    
  let queue = await Bot.distube.getQueue(message)
  
  if (queue){
    Bot.distube.stop(message)
    
    message.channel.send({
      embed: {
        title: `Stopped Song`,
        description: `Stopped currently playing song.`,
        color: "#0099ff",

        thumbnail: {
          url: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/YouTube.jpg"
        },
        
        footer: {
          text: `Stopped song`,
          icon_url: Bot.user.displayAvatarURL()
        }
      }
    })
  }
},

  exports.config = {
    name: "Stop",
    description: "Disconnects me from the voice channel and removes all songs in queue.",
    aliases: ["disconnect", "leave"],
    usage: "",
    category: "🎵music🎵",
    bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
    member_permissions: [],
    enabled: true,
    cooldown: 5
  }