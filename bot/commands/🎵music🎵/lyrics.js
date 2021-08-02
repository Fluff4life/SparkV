const Discord = require(`discord.js`);
// Const Buttons = require("discord-buttons")
// const ButtonPages = require("discord-embeds-pages-buttons")
const EasyPages = require('discordeasypages');

const fetch = require(`node-fetch`);
const LyrcisFinder = require(`lyrics-finder`);

exports.run = async (bot, message, args, command, data) => {
  if (!args) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | Please supply the title of a song to search for.`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  args = args.join(' ');

  const Lyrics = LyrcisFinder(args);

  if (!Lyrics) {
    return message.reply(`${bot.config.bot.Emojis.error} | I couldn't find the lyrics for **${args}**!`);
  }

  if (Lyrics.lyrics.length <= 2000) {
    const SongEmbed = new Discord.MessageEmbed()
      .setTitle(Lyrics.title)
      .setDescription(Lyrics.lyrics)
      .setThumbnail(Lyrics.thumbnail.genius)
      .setFooter(bot.config.bot.Embed.Footer)
      .setAuthor(`Song by ${Lyrics.author}`, null, Lyrics.links.genius)
      .setColor(bot.config.bot.Embed.Color)
      .setTimestamp();

    return message.reply(SongEmbed);
  }

  const LyricsArray = Lyrics.lyrics.split(`\n`);
  const LyricsSubArray = [];
  const pages = [];
  var e = 0;

  for (const line of LyricsArray) {
    if (LyricsSubArray[e].length + line.length < 2000) {
      LyricsSubArray[e] = `${LyricsSubArray[e] + line}\n`;
    } else {
      e++;
      LyricsSubArray.push(line);
    }
  }

  const CreatePage = (bot, Message, x) => {
    const SongEmbed = new Discord.MessageEmbed()
      .setTitle(Lyrics.title)
      .setDescription(x)
      .setThumbnail(Lyrics.thumbnail.genius)
      .setFooter(bot.config.bot.Embed.Footer)
      .setAuthor(`Song by ${Lyrics.author}`, null, Lyrics.links.genius)
      .setColor(bot.config.bot.Embed.Color)
      .setTimestamp();

    pages.push(SongEmbed);
  };

  LyricsSubArray.map((x, i) => CreatePage(bot, message, x));
  EasyPages(message, Pages, ['⬅', '➡']);
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
};
