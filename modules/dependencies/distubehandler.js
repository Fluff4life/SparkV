const { MessageEmbed } = require("discord.js")
const discordeasypages = require("discordeasypages")

module.exports = async (Bot) => {
  const DisTube = require("distube")
  const Discord = require("discord.js")

  Bot.distube = new DisTube(Bot, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true, leaveOnEmpty: true, leaveOnStop: true, highWaterMark: 1<<25, youtubeDL: true, updateYouTubeDL: true })

  Bot.distube
    .on("playSong", async (message, queue, song) => {
      const NowPlayingEmbed = new Discord.MessageEmbed()
        .setTitle(`🎵 Now Playing a Song 🎵`)
        .setDescription(song.name)
        .setThumbnail(song.thumbnail)
        .addFields(
          {
            name: `Requester`,
            value: song.user,
            inline: true,
          },

          {
            name: `▶Views`,
            value: `\`\`\`${await Bot.FormatNumber(song.views)}\`\`\``,
            inline: true
          },

          {
            name: `Stats`,
            value: `\`\`\`👍Likes: ${await Bot.FormatNumber(song.likes)}\n👎Dislikes: ${await Bot.FormatNumber(song.dislikes)}\`\`\``,
            inline: true
          },
        )
        .setURL(song.url)
        .setColor(Bot.Config.Embed.EmbedColor)
        .setFooter(`😀${song.formattedDuration}`, Bot.user.displayAvatarURL())
        .setTimestamp()

      message.channel.send(NowPlayingEmbed)
    })
    .on("playList", async (message, queue, playlist, song) => {
      const NowPlayingEmbed = new Discord.MessageEmbed()
        .setTitle(`🎵 Now Playing a Playlist 🎵`)
        .setDescription(`${playlist.name}`)
        .setThumbnail(song.thumbnail)
        .addFields(
          {
            name: `Requester`,
            value: song.user,
            inline: true,
          },

          {
            name: `▶Views`,
            value: `\`\`\`${await Bot.FormatNumber(song.views)}\`\`\``,
            inline: true
          },

          {
            name: `Stats`,
            value: `\`\`\`👍Likes: ${await Bot.FormatNumber(song.likes)}\n👎Dislikes: ${await Bot.FormatNumber(song.dislikes)}\`\`\``,
            inline: true
          },
        )
        .setURL(song.url)
        .setColor(Bot.Config.Embed.EmbedColor)
        .setFooter(`(${playlist.songs.length} songs) - Now Playing ${song.name} (${song.formattedDuration})`, Bot.user.displayAvatarURL())
        .setTimestamp()

      message.channel.send(NowPlayingEmbed)
    })
    .on("addSong", async (message, queue, song) => {
      const SongAddedQueue = new Discord.MessageEmbed()
        .setTitle("➕Added Song To Queue")
        .setDescription(song.name)
        .setThumbnail(song.thumbnail)
        .addFields(
          {
            name: `Requester`,
            value: song.user,
            inline: true,
          },

          {
            name: `Duration`,
            value: `\`\`\`${song.formattedDuration}\`\`\``,
            inline: true,
          },

          {
            name: `Queue`,
            value: `\`\`\`${await Bot.FormatNumber(queue.songs.length)} songs - ${queue.duration}\`\`\``,
            inline: true,
          }
        )
        .setURL(song.url)
        .setColor(Bot.Config.Embed.EmbedColor)
        .setFooter(`😀${song.formattedDuration}`, Bot.user.displayAvatarURL())
        .setTimestamp()

      message.channel.send(SongAddedQueue)
    })
    .on("addList", async (message, queue, playlist) => {
      const SongAddedQueue = new Discord.MessageEmbed()
        .setTitle("➕Added Playlist To Queue")
        .setDescription(playlist.name)
        .setThumbnail(song.thumbnail)
        .addFields(
          {
            name: `Requester`,
            value: song.user,
            inline: true,
          },

          {
            name: `Queue`,
            value: `\`\`\`${await Bot.FormatNumber(queue.songs.length)} songs - ${queue.duration}\`\`\``,
            inline: true,
          }
        )
        .setURL(song.url)
        .setColor(Bot.Config.Embed.EmbedColor)
        .setFooter(`😀${song.formattedDuration}`, Bot.user.displayAvatarURL())
        .setTimestamp()

      message.channel.send(SongAddedQueue)

      message.channel.send(message.channel.send({
        embed: {
          title: `Added ${playlist.name} to Queue`,
          description: `😀Added by ${playlist.user || "unknown"}`,
          color: "#0099ff",

          footer: {
            text: `${playlist.songs.length} songs (${playlist.formattedDuration})`,
            icon_url: Bot.user.displayAvatarURL()
          },
        }
      }))
    })
    .on("searchResult", (message, result) => {
      try {
        var Pages = []

        const CreatePage = (Song) => {
          const NewEmbed = new MessageEmbed()
            .setTitle(`${Song.formattedDuration} | ${Song.name}`)
            .setDescription(`To select this song, send the page number. Example: 1`)
            .setColor(Bot.Config.Embed.EmbedColor)
            .setURL(Song.url)
            .setImage(Song.thumbnail)
  
          Pages.push(NewEmbed)
        }
  
        result.map(song => CreatePage(song))
        discordeasypages(message, Pages, ["⏪", "⏩", "🗑"])
      } catch(err) {
        console.error(err)
      }
    })
    .on("finish", (message) => {
      message.channel.send("No songs left in queue. Add more songs!").then(m => m.delete({ timeout: 10000 }))
    })
    .on("noRelated", (message) => {
      message.channel.send("I cannot find a related video to play. I am stopping the music.").then(m => m.delete({ timeout: 10000 }))
    })
    .on("searchCancel", (message) => {
      message.channel.send(`Searching canceled.`).then(m => m.delete({ timeout: 10000 }))
    })
    .on("empty", (message) => {
      message.channel.send("Voice chat is empty. Leaving the VC.").then(m => m.delete({ timeout: 10000 }))
    })
    .on("error", (message, err) => {
      console.error(err)

      message.channel.send({
        embed: {
          title: `Error Occured!`,
          description: err,
          color: Bot.Config.Embed.EmbedColor,

          footer: {
            text: `⚠Music command failed.`,
            icon_url: Bot.user.displayAvatarURL()
          }
        }
      })
    })
}