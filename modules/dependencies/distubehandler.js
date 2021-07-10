const { MessageEmbed } = require("discord.js")
const ButtonPages = require("discord-button-pages")

module.exports = async (Bot) => {
  const DisTube = require("distube")
  const Discord = require("discord.js")

  Bot.distube = new DisTube(Bot, {
    searchSongs: true,
    emitNewSongOnly: true,
    leaveOnFinish: true,
    leaveOnEmpty: true,
    leaveOnStop: true,
    highWaterMark: 1<<25,
    youtubeDL: true,
    updateYouTubeDL: true,
    emitNewSongOnly: true,
    youtubeCookie: process.env.YouTubeAPIKey
  })

  Bot.distube
    .on("playSong", async (message, queue, song) => {
      const NowPlayingEmbed = new Discord.MessageEmbed()
        .setTitle(`🎵 Now Playing a Song 🎵`)
        .setDescription(song.name)
        .setThumbnail(song.thumbnail)
        .addFields(
          {
            name: `⚙︱Audio Stats`,
            value: `\`\`\`👍︱Likes: ${await Bot.FormatNumber(song.likes)}\n👎︱Dislikes: ${await Bot.FormatNumber(song.dislikes)}\n▶︱Views: ${await Bot.FormatNumber(song.views)}\n📼︱Duration: ${song.formattedDuration}\`\`\``,
            inline: true
          },

          {
            name: `🔊︱Audio Settings`,
            value: `\`\`\`🔉︱Volume: ${queue.volume}%\n🔁︱Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Server Queue" : "Current Song" : "❎"}\n🔂︱AutoPlay: ${queue.autoplay ? "✅" : "❎"}\`\`\``,
            inline: true,
          }
        )
        .setURL(song.url)
        .setColor(Bot.Config.Bot.Embed.Color)
        .setFooter(`📼 ${song.user.username} (${song.user.tag}) • ${Bot.Config.Bot.Embed.Footer}`, Bot.user.displayAvatarURL())
        .setTimestamp()

      message.lineReplyNoMention(NowPlayingEmbed)
    })
    .on("playList", async (message, queue, playlist, song) => {
      const NowPlayingEmbed = new Discord.MessageEmbed()
        .setTitle(`🎵 Now Playing a Playlist 🎵`)
        .setDescription(playlist.name)
        .setThumbnail(playlist.thumbnail.url)
        .addFields(
          {
            name: `⚙︱Audio Stats`,
            value: `\`\`\`👍︱Likes: ${await Bot.FormatNumber(song.likes)}\n👎︱Dislikes: ${await Bot.FormatNumber(song.dislikes)}\n▶︱Views: ${await Bot.FormatNumber(song.views)}\n📼︱Duration: ${song.formattedDuration}\`\`\``,
            inline: true
          },

          {
            name: `🔊︱Audio Settings`,
            value: `\`\`\`🔉︱Volume: ${queue.volume}%\n🔁︱Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Server Queue" : "Current Song" : "❎"}\n🔂︱AutoPlay: ${queue.autoplay ? "✅" : "❎"}\`\`\``,
            inline: true,
          }
        )
        .setURL(song.url)
        .setColor(Bot.Config.Bot.Embed.Color)
        .setFooter(`📼 ${song.user.username} (${song.user.tag}) • (${playlist.songs.length} songs) - Now Playing ${song.name} • ${Bot.Config.Bot.Embed.Footer}`, Bot.user.displayAvatarURL())
        .setTimestamp()

      message.lineReplyNoMention(NowPlayingEmbed)
    })
    .on("addSong", async (message, queue, song) => {
      const SongAddedQueue = new Discord.MessageEmbed()
        .setTitle("➕ Added Song To Queue")
        .setDescription(song.name)
        .setThumbnail(song.thumbnail)
        .addFields(
          {
            name: `⚙︱Audio Stats`,
            value: `\`\`\`👍︱Likes: ${await Bot.FormatNumber(song.likes)}\n👎︱Dislikes: ${await Bot.FormatNumber(song.dislikes)}\n▶︱Views: ${await Bot.FormatNumber(song.views)}\n📼︱Duration: ${song.formattedDuration}\`\`\``,
            inline: true
          },

          {
            name: `🔊︱Audio Settings`,
            value: `\`\`\`🔉︱Volume: ${queue.volume}%\n🔁︱Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Server Queue" : "Current Song" : "❎"}\n🔂︱AutoPlay: ${queue.autoplay ? "✅" : "❎"}\`\`\``,
            inline: true,
          }
        )
        .setURL(song.url)
        .setColor(Bot.Config.Bot.Embed.Color)
        .setFooter(`📼 Added by ${song.user.username} (${song.user.tag}) • ${Bot.Config.Bot.Embed.Footer}`, Bot.user.displayAvatarURL())
        .setTimestamp()

      message.lineReplyNoMention(SongAddedQueue)
    })
    .on("addList", async (message, queue, playlist) => {
      const SongAddedQueue = new Discord.MessageEmbed()
        .setTitle("➕ Added Playlist To Queue")
        .setDescription(playlist.name)
        .setThumbnail(playlist.thumbnail)
        .addFields(
          {
            name: `⚙︱Audio Stats`,
            value: `\`\`\`👍︱Likes: ${await Bot.FormatNumber(song.likes)}\n👎︱Dislikes: ${await Bot.FormatNumber(song.dislikes)}\n▶︱Views: ${await Bot.FormatNumber(song.views)}\n📼︱Duration: ${song.formattedDuration}\`\`\``,
            inline: true
          },

          {
            name: `🔊︱Audio Settings`,
            value: `\`\`\`🔉︱Volume: ${queue.volume}%\n🔁︱Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Server Queue" : "Current Song" : "❎"}\n🔂︱AutoPlay: ${queue.autoplay ? "✅" : "❎"}\`\`\``,
            inline: true,
          }
        )
        .setURL(song.url)
        .setColor(Bot.Config.Bot.Embed.Color)
        .setFooter(`📼 ${song.user.username} (${song.user.tag}) • ${Bot.Config.Bot.Embed.Footer}`, Bot.user.displayAvatarURL())
        .setTimestamp()

      message.lineReplyNoMention(SongAddedQueue)
    })
    .on("searchResult", (message, result) => {
      try {
        var Pages = []

        const CreatePage = (Song) => {
          const NewEmbed = new MessageEmbed()
            .setTitle(`${Song.formattedDuration} | ${Song.name}`)
            .setColor(Bot.Config.Bot.Embed.Color)
            .setURL(Song.url)
            .setImage(Song.thumbnail)
            .setFooter(`To select this song, send the page number! For example, 1.`)
  
          Pages.push(NewEmbed)
        }
  
        result.map(song => CreatePage(song))
        ButtonPages.createPages(Bot.interaction, message, Pages, 60 * 1000, "blurple", "⏩", "⏪", "❌")
      } catch(err) {
        console.error(err)
      }
    })
    .on("finish", (message) => {
      message.lineReplyNoMention("No songs left in queue. Add more songs!")
    })
    .on("noRelated", (message) => {
      message.lineReplyNoMention("I cannot find a related video to play. I am stopping the music.")
    })
    .on("searchCancel", (message) => {
      message.lineReplyNoMention(`Searching canceled.`)
    })
    .on("empty", (message) => {
      message.lineReplyNoMention("Voice chat is empty. Leaving the VC.")
    })
    .on("error", (message, err) => {
      console.error(err)

      message.lineReplyNoMention(`❎︱Uh oh! An error occured. Please try again later.`)
    })
}
