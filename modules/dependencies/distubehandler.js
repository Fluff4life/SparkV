const { MessageEmbed } = require('discord.js');
// Const Buttons = require("discord-buttons")
// const ButtonPages = require("discord-embeds-pages-buttons")
const EasyPages = require('discordeasypages');

module.exports = async bot => {
  const DisTube = require('distube');
  const Discord = require('discord.js');

  bot.distube = new DisTube(bot, {
    searchSongs: true,
    emitNewSongOnly: true,
    leaveOnFinish: true,
    leaveOnEmpty: true,
    leaveOnStop: true,
    highWaterMark: 1 << 25,
    youtubeDL: true,
    updateYouTubeDL: true,
    youtubeCookie: process.env.YouTubeAPIKey,
  });

  bot.distube
    .on('playSong', async (message, queue, song) => {
      const NowPlayingEmbed = new Discord.MessageEmbed()
        .setTitle(`🎵 Now Playing a Song 🎵`)
        .setDescription(song.name)
        .setThumbnail(song.thumbnail)
        .addFields(
          {
            name: `⚙︱Audio Stats`,
            value: `\`\`\`👍︱Likes: ${await bot.FormatNumber(song.likes)}\n👎︱Dislikes: ${await bot.FormatNumber(
              song.dislikes,
            )}\n▶︱Views: ${await bot.FormatNumber(song.views)}\n📼︱Duration: ${song.formattedDuration}\`\`\``,
            inline: true,
          },

          {
            name: `🔊︱Audio Settings`,
            value: `\`\`\`🔉︱Volume: ${queue.volume}%\n🔁︱Loop: ${
              queue.repeatMode ? (queue.repeatMode === 2 ? 'Server Queue' : 'Current Song') : '❎'
            }\n🔂︱AutoPlay: ${queue.autoplay ? '✅' : '❎'}\`\`\``,
            inline: true,
          },
        )
        .setURL(song.url)
        .setColor(bot.config.bot.Embed.Color)
        .setFooter(
          `📼 ${song.user.username} (${song.user.tag}) • ${bot.config.bot.Embed.Footer}`,
          bot.user.displayAvatarURL(),
        )
        .setTimestamp();

      message.reply(NowPlayingEmbed);
    })
    .on('playList', async (message, queue, playlist, song) => {
      const NowPlayingEmbed = new Discord.MessageEmbed()
        .setTitle(`🎵 Now Playing a Playlist 🎵`)
        .setDescription(playlist.name)
        .setThumbnail(playlist.thumbnail.url)
        .addFields(
          {
            name: `⚙︱Audio Stats`,
            value: `\`\`\`👍︱Likes: ${await bot.FormatNumber(song.likes)}\n👎︱Dislikes: ${await bot.FormatNumber(
              song.dislikes,
            )}\n▶︱Views: ${await bot.FormatNumber(song.views)}\n📼︱Duration: ${song.formattedDuration}\`\`\``,
            inline: true,
          },

          {
            name: `🔊︱Audio Settings`,
            value: `\`\`\`🔉︱Volume: ${queue.volume}%\n🔁︱Loop: \`${
              queue.repeatMode ? (queue.repeatMode === 2 ? 'Server Queue' : 'Current Song') : '❎'
            }\n🔂︱AutoPlay: ${queue.autoplay ? '✅' : '❎'}\`\`\``,
            inline: true,
          },
        )
        .setURL(song.url)
        .setColor(bot.config.bot.Embed.Color)
        .setFooter(
          `📼 ${song.user.username} (${song.user.tag}) • (${playlist.songs.length} songs) - Now Playing ${song.name} • ${bot.config.bot.Embed.Footer}`,
          bot.user.displayAvatarURL(),
        )
        .setTimestamp();

      message.reply(NowPlayingEmbed);
    })
    .on('addSong', async (message, queue, song) => {
      const SongAddedQueue = new Discord.MessageEmbed()
        .setTitle('➕ Added Song To Queue')
        .setDescription(song.name)
        .setThumbnail(song.thumbnail)
        .addFields(
          {
            name: `⚙︱Audio Stats`,
            value: `\`\`\`👍︱Likes: ${await bot.FormatNumber(song.likes)}\n👎︱Dislikes: ${await bot.FormatNumber(
              song.dislikes,
            )}\n▶︱Views: ${await bot.FormatNumber(song.views)}\n📼︱Duration: ${song.formattedDuration}\`\`\``,
            inline: true,
          },

          {
            name: `🔊︱Audio Settings`,
            value: `\`\`\`🔉︱Volume: ${queue.volume}%\n🔁︱Loop: \`${
              queue.repeatMode ? (queue.repeatMode === 2 ? 'Server Queue' : 'Current Song') : '❎'
            }\n🔂︱AutoPlay: ${queue.autoplay ? '✅' : '❎'}\`\`\``,
            inline: true,
          },
        )
        .setURL(song.url)
        .setColor(bot.config.bot.Embed.Color)
        .setFooter(
          `📼 Added by ${song.user.username} (${song.user.tag}) • ${bot.config.bot.Embed.Footer}`,
          bot.user.displayAvatarURL(),
        )
        .setTimestamp();

      message.reply(SongAddedQueue);
    })
    .on('addList', async (message, queue, playlist) => {
      const SongAddedQueue = new Discord.MessageEmbed()
        .setTitle('➕ Added Playlist To Queue')
        .setDescription(playlist.name)
        .setThumbnail(playlist.thumbnail)
        .addFields(
          {
            name: `⚙︱Audio Stats`,
            value: `\`\`\`👍︱Likes: ${await bot.FormatNumber(song.likes)}\n👎︱Dislikes: ${await bot.FormatNumber(
              song.dislikes,
            )}\n▶︱Views: ${await bot.FormatNumber(song.views)}\n📼︱Duration: ${song.formattedDuration}\`\`\``,
            inline: true,
          },

          {
            name: `🔊︱Audio Settings`,
            value: `\`\`\`🔉︱Volume: ${queue.volume}%\n🔁︱Loop: \`${
              queue.repeatMode ? (queue.repeatMode === 2 ? 'Server Queue' : 'Current Song') : '❎'
            }\n🔂︱AutoPlay: ${queue.autoplay ? '✅' : '❎'}\`\`\``,
            inline: true,
          },
        )
        .setURL(song.url)
        .setColor(bot.config.bot.Embed.Color)
        .setFooter(
          `📼 ${song.user.username} (${song.user.tag}) • ${bot.config.bot.Embed.Footer}`,
          bot.user.displayAvatarURL(),
        )
        .setTimestamp();

      message.reply(SongAddedQueue);
    })
    .on('searchResult', (message, result) => {
      try {
        var Pages = [];

        const CreatePage = Song => {
          const NewEmbed = new MessageEmbed()
            .setTitle(`${Song.formattedDuration} | ${Song.name}`)
            .setColor(bot.config.bot.Embed.Color)
            .setURL(Song.url)
            .setImage(Song.thumbnail);

          Pages.push(NewEmbed);
        };

        result.map(song => CreatePage(song));
        EasyPages(message, Pages, ['⬅', '➡'], '⚡ - To select this song, send the current page number. For example, to select page 1 send 1.',);
      } catch (err) {
        console.error(err);
      }
    })
    .on('finish', message => {
      message.reply('No songs left in queue. Add more songs!');
    })
    .on('noRelated', message => {
      message.reply('I cannot find a related video to play. I am stopping the music.');
    })
    .on('searchCancel', message => {
      message.reply(`Searching canceled.`);
    })
    .on('empty', message => {
      message.reply('Voice chat is empty. Leaving the VC.');
    })
    .on('error', (message, err) => {
      console.error(err);

      message.reply(`❎︱Uh oh! An error occured. Please try again later.`);
    });
};
