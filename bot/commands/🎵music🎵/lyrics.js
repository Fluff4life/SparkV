const Discord = require(`discord.js`);
const Buttons = require("discord-buttons")
// const ButtonPages = require("discord-embeds-pages-buttons")
const EasyPages = require("discordeasypages")

const fetch = require(`node-fetch`)
const LyrcisFinder = require(`lyrics-finder`)

exports.run = async (Bot, message, Arguments) => {
  if (!Arguments){
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | Please supply the title of a song to search for.`).then(m => m.delete({ timeout: 5000 }))
  }

  Arguments = Arguments.join(" ")

  const data = LyrcisFinder(Arguments)

  if (!data){
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | I couldn't find the lyrics for **${Arguments}**!`)
  }

  if (data.lyrics.length <= 2000){
    const SongEmbed = new Discord.MessageEmbed()
      .setTitle(data.title)
      .setDescription(data.lyrics)
      .setThumbnail(data.thumbnail.genius)
      .setFooter(Bot.Config.Bot.Embed.Footer)
      .setAuthor(`Song by ${data.author}`, null, data.links.genius)
      .setColor(Bot.Config.Bot.Embed.Color)
      .setTimestamp()

    return message.lineReply(SongEmbed)
  }

  const LyricsArray = data.lyrics.split(`\n`)
  const LyricsSubArray = []
  const pages = []
  const e = 0

  for (const line of LyricsArray){
    if (LyricsSubArray[e].length + line.length < 2000){
      LyricsSubArray[e] = LyricsSubArray[e] + line + `\n`
    } else {
      e++
      LyricsSubArray.push(line)
    }
  }

  const CreatePage = (Bot, Message, x) => {
    const SongEmbed = new Discord.MessageEmbed()
    .setTitle(data.title)
    .setDescription(x)
    .setThumbnail(data.thumbnail.genius)
    .setFooter(Bot.Config.Bot.Embed.Footer)
    .setAuthor(`Song by ${data.author}`, null, data.links.genius)
    .setColor(Bot.Config.Bot.Embed.Color)
    .setTimestamp()

    pages.push(SongEmbed)
  }

  LyricsSubArray.map((x, i) => CreatePage(Bot, message, x))
  EasyPages(message, Pages, ["⬅", "➡"])
},

exports.config = {
  name: `Lyrics`,
  description: `Get any song's lyrics!`,
  aliases: [`song`, `verse`],
  usage: `<song title or URL>`,
  category: `🎵music🎵`,
  bot_permissions: [`SEND_MESSAGES`, `READ_MESSAGE_HISTORY`, `EMBED_LINKS`, `VIEW_CHANNEL`, `CONNECT`, `SPEAK`],
  member_permissions: [],
  enabled: true,
  cooldown: 5
}