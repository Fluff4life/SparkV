const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const queue = Bot.distube.getQueue(message)

  if (!queue){
    return message.lineReplyNoMention("The queue is empty! Try adding some songs.")
  }

  message.lineReplyNoMention({
    embed: {
      title: `Queue for ${message.guild.name}`,
      description: queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - ${song.formattedDuration}`).slice(0, 10).join("\n"),
      color: "#0099ff",
    
      thumbnail: {
        url: message.author.displayAvatarURL({ dynamic: true })
      },
      
      footer: {
        text: `Displaying music queue.`,
        icon_url: Bot.user.displayAvatarURL()
      },
    }
  })
},

exports.config = {
  name: "Queue",
  description: "Shows the songs in queue.",
  aliases: ["que"],
  usage: "",
  category: "🎵music🎵",
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  member_permissions: [],
  enabled: true,
  cooldown: 5
}