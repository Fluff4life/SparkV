const Discord = require("discord.js");
const LyricsFilder = require("lyrics-finder")

exports.run = async (Bot, message, Arguments) => {
  if (!Arguments){
    return message.channel.send("Please supply the title of the song and artist.").then(m => m.delete({ timeout: 5000 }))
  }
  
  Arguments = Arguments.join(" ")
  
  let lyrics = await LyricsFilder(Arguments, Arguments) || "Not found!"

  if (lyrics.length > 2000){
    return message.channel.send("This song has too much lyrics for me to send!")
  }
  
  await message.author.send({
    embed: {
      title: `Lyrics for ${Arguments}`,
      description: lyrics,
      color: "#0099ff",
    }
  }).then(() => {
    message.reply("I sent the song's lyrics to your DMs.")
  }).catch(() => {
    message.reply("to prevent spam, please enable your DMs so I can DM you with the lyrics.")
    })
},

exports.config = {
  name: "Lyrics",
  description: "Get any song's lyrics!",
  aliases: ["song", "verse"],
  usage: "<song title or URL>",
  category: "🎵music🎵",
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  member_permissions: [],
  enabled: true,
  cooldown: 3
}