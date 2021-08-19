const Discord = require("discord.js");
const EasyPages = require("discordeasypages");

module.exports = async bot => {
  const { DisTube, Queue } = require("distube");
  const { SpotifyPlugin } = require("@distube/spotify");
  const { SoundCloudPlugin } = require("@distube/soundcloud");

  bot.distube = new DisTube(bot, {
    youtubeCookie: process.env.YouTubeAPIKey,
    searchSongs: 20,
    searchCooldown: 30,
    leaveOnFinish: true,
    leaveOnEmpty: true,
    leaveOnStop: true,
    plugins: [
      new SpotifyPlugin(),
      new SoundCloudPlugin()
    ]
  });

  bot.distube
    .on("playSong", async (queue, song) => {
      if (song.playlist) {
        const NowPlayingEmbed = new Discord.MessageEmbed()
          .setTitle(`🎵 Now Playing a Playlist 🎵`)
          .setDescription(song.playlist.name)
          .setThumbnail(song.playlist.thumbnail.url)
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
              value: `\`\`\`🔉︱Volume: ${queue.volume}%\n🔁︱Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? "Server Queue" : "Current Song") : "❎"
                }\n🔂︱AutoPlay: ${queue.autoplay ? "✅" : "❎"}\`\`\``,
              inline: true,
            },
          )
          .setURL(song.url)
          .setColor(bot.config.bot.Embed.Color)
          .setFooter(
            `📼 ${song.user.username} (${song.user.tag}) • (${song.playlist.songs.length} songs) - Now Playing ${song.name} • ${bot.config.bot.Embed.Footer}`,
            bot.user.displayAvatarURL(),
          )
          .setTimestamp();

        queue.textChannel.reply(NowPlayingEmbed);
      } else {
        const NowPlayingEmbed = new Discord.MessagEmbed()
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
              value: `\`\`\`🔉︱Volume: ${queue.volume}%\n🔁︱Loop: ${queue.repeatMode ? (queue.repeatMode === 2 ? "Server Queue" : "Current Song") : "❎"
                }\n🔂︱AutoPlay: ${queue.autoplay ? "✅" : "❎"}\`\`\``,
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

        queue.textChannel.reply(NowPlayingEmbed);
      }
    })
    .on("addSong", async (queue, song) => {
      const SongAddedQueue = new Discord.MessagEmbed()
        .setTitle("➕ Added Song To Queue")
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
            value: `\`\`\`🔉︱Volume: ${queue.volume}%\n🔁︱Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? "Server Queue" : "Current Song") : "❎"
              }\n🔂︱AutoPlay: ${queue.autoplay ? "✅" : "❎"}\`\`\``,
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

      queue.textChannel.reply(SongAddedQueue);
    })
    .on("addList", async (queue, playlist) => {
      const SongAddedQueue = new Discord.MessagEmbed()
        .setTitle("➕ Added Playlist To Queue")
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
            value: `\`\`\`🔉︱Volume: ${queue.volume}%\n🔁︱Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? "Server Queue" : "Current Song") : "❎"
              }\n🔂︱AutoPlay: ${queue.autoplay ? "✅" : "❎"}\`\`\``,
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

      queue.textChannel.reply(SongAddedQueue);
    })
    .on("searchResult", result => {
      try {
        var Pages = [];

        const CreatePage = Song => {
          const NewEmbed = new Discord.MessageEmbed()
            .setTitle(`${Song.formattedDuration} | ${Song.name}`)
            .setColor(bot.config.bot.Embed.Color)
            .setURL(Song.url)
            .setImage(Song.thumbnail);

          Pages.push(NewEmbed);
        };

        result.map(song => CreatePage(song));
        EasyPages(queue.textChannel, Pages, ["⬅", "➡"], "⚡ - To select this song, send the current page number. For example, to select page 1 send 1.",);
      } catch (err) {
        console.error(err);
      }
    })
    .on("searchCancel", message => message.channel.reply(`Searching canceled.`))
    .on("searchInvalidAnswer", message => message.channel.reply("Search answer invalid. Make sure you're sending your selected song's page number. For example, if I wanted to play a song on the 5th page, I would send the number 5."))
    .on("searchNoResult", message => message.channel.send("No result found!"))
    .on("finish", queue => queue.textChannel.reply("No songs left in queue."))
    .on("finishSong", queue => queue.textChannel.reply("Hope you enjoyed the song!"))
    .on("noRelated", message => message.channel.reply("I cannot find a related video to play. I am stopping the music."))
    .on("empty", queue => queue.textChannel.reply("Voice chat is empty. I'm going to leave the voice chat now."))
    .on("disconnect", queue => queue.textChannel.send("Disconnected from voice chat."))
    .on("error", (channel, err) => {
      console.error(err);

      channel.reply(`❎︱Uh oh! An error occured. Please try again later. Error: ${err.slice(0, 1950)}`);
    });
};
