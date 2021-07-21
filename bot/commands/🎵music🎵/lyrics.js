const Discord = require(`discord.js`);
const Buttons = require("discord-buttons")
// const ButtonPages = require("discord-embeds-pages-buttons")
const EasyPages = require("discordeasypages")

const fetch = require(`node-fetch`)
const LyrcisFinder = require(`lyrics-finder`)

exports.run = async (bot, message, args, command, data) => {
  if (!args){
    return message.reply(`${bot.config.bot.Emojis.error} | Please supply the title of a song to search for.`).then(m => m.delete({ timeout: 5000 }))
  }

  args = args.join(" ")

  const data = LyrcisFinder(args)

  if (!data){
    return message.reply(`${bot.config.bot.Emojis.error} | I couldn't find the lyrics for **${args}**!`)
  }

  if (data.lyrics.length <= 2000){
    const SongEmbed = new Discord.MessageEmbed()
      .setTitle(data.title)
      .setDescription(data.lyrics)
      .setThumbnail(data.thumbnail.genius)
      .setFooter(bot.config.bot.Embed.Footer)
      .setAuthor(`Song by ${data.author}`, null, data.links.genius)
      .setColor(bot.config.bot.Embed.Color)
      .setTimestamp()

    return message.reply(SongEmbed)
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

  const CreatePage = (bot, Message, x) => {
    const SongEmbed = new Discord.MessageEmbed()
    .setTitle(data.title)
    .setDescription(x)
    .setThumbnail(data.thumbnail.genius)
    .setFooter(bot.config.bot.Embed.Footer)
    .setAuthor(`Song by ${data.author}`, null, data.links.genius)
    .setColor(bot.config.bot.Embed.Color)
    .setTimestamp()

    pages.push(SongEmbed)
  }

  LyricsSubArray.map((x, i) => CreatePage(bot, message, x))
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