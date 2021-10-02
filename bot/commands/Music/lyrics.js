const Discord = require(`discord.js`);
const EasyPages = require("discordeasypages");

const cmd = require("../../templates/musicCommand");

const fetch = require(`node-fetch`);
const LyrcisFinder = require(`lyrics-finder`);

async function execute(bot, message, args, command, data) {
  if (!args) {
    return message
      .reply(`${bot.config.Emojis.error} | Please supply the title of a song to search for.`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  args = args.join(" ");

  const Lyrics = LyrcisFinder(args);

  if (!Lyrics) {
    return message.reply(`${bot.config.Emojis.error} | I couldn't find the lyrics for **${args}**!`);
  }

  if (Lyrics.lyrics.length <= 2000) {
    const SongEmbed = new Discord.MessageEmbed()
      .setTitle(Lyrics.title)
      .setDescription(Lyrics.lyrics)
      .setThumbnail(Lyrics.thumbnail.genius)
      .setFooter(bot.config.embed.footer)
      .setAuthor(`Song by ${Lyrics.author}`, null, Lyrics.links.genius)
      .setColor(bot.config.embed.color)
      .setTimestamp();

    return message.reply({
      embeds: [SongEmbed],
    });
  }

  const LyricsArray = Lyrics.lyrics.split(`\n`);
  const LyricsSubArray = [];
  const pages = [];
  let e = 0;

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
      .setFooter(bot.config.embed.footer)
      .setAuthor(`Song by ${Lyrics.author}`, null, Lyrics.links.genius)
      .setColor(bot.config.embed.color)
      .setTimestamp();

    LyricsSubArray.map((x, i) => CreatePage(bot, message, x));
    EasyPages(message, Pages, ["⬅", "➡"]);
  };
}

module.exports = new cmd(execute, {
  description: `Get any song's lyrics!`,
  dirname: __dirname,
  usage: "<song title or URL>",
  aliases: ["song", "verse"],
  perms: ["EMBED_LINKS"],
});
