const { MessageEmbed } = require("discord.js")
const pagination = require("discord.js-pagination")

module.exports = async (Bot) => {
  const DisTube = require("distube")
  const Discord = require("discord.js")
  const canvacord = require("canvacord")

  Bot.distube = new DisTube(Bot, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true, leaveOnEmpty: true, leaveOnStop: true, highWaterMark: 1<<25, youtubeDL: true, updateYouTubeDL: true })

  Bot.distube
    .on("playSong", (message, queue, song) => {
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
            value: `\`\`\`${song.views}\`\`\``,
            inline: true
          },

          {
            name: `Stats`,
            value: `\`\`\`👍Likes: ${song.likes}\n👎Dislikes: ${song.dislikes}\`\`\``,
            inline: true
          },
        )
        .setURL(song.url)
        .setColor(Bot.Config.Embed.EmbedColor)
        .setFooter(`😀${song.formattedDuration}`, Bot.user.AvatarURL)
        .setTimestamp()

      message.channel.send(NowPlayingEmbed)
    })
    .on("playList", (message, queue, playlist, song) => {
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
            value: `\`\`\`${song.views}\`\`\``,
            inline: true
          },

          {
            name: `Stats`,
            value: `\`\`\`👍Likes: ${song.likes}\n👎Dislikes: ${song.dislikes}\`\`\``,
            inline: true
          },
        )
        .setURL(song.url)
        .setColor(Bot.Config.Embed.EmbedColor)
        .setFooter(`(${playlist.songs.length} songs) - Now Playing ${song.name} (${song.formattedDuration})`, Bot.user.AvatarURL)
        .setTimestamp()

      message.channel.send(NowPlayingEmbed)
    })
    .on("addSong", (message, queue, song) => {
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
            value: `\`\`\`${queue.songs.length} songs - ${queue.duration}\`\`\``,
            inline: true,
          }
        )
        .setURL(song.url)
        .setColor(Bot.Config.Embed.EmbedColor)
        .setFooter(`😀${song.formattedDuration}`, Bot.user.AvatarURL)
        .setTimestamp()

      message.channel.send(SongAddedQueue)
    })
    .on("addList", (message, queue, playlist) => {
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
            value: `\`\`\`${queue.songs.length} songs - ${queue.duration}\`\`\``,
            inline: true,
          }
        )
        .setURL(song.url)
        .setColor(Bot.Config.Embed.EmbedColor)
        .setFooter(`😀${song.formattedDuration}`, Bot.user.AvatarURL)
        .setTimestamp()

      message.channel.send(SongAddedQueue)

      message.channel.send(message.channel.send({
        embed: {
          title: `Added ${playlist.name} to Queue`,
          description: `😀Added by ${playlist.user || "unknown"}`,
          color: "#0099ff",

          footer: {
            text: `${playlist.songs.length} songs (${playlist.formattedDuration})`,
            icon_url: Bot.user.AvatarURL
          },
        }
      }))
    })
    .on("searchResult", (message, result) => {
      let Pages = []

      const CreatePage = (Message, Song) => {
        const NewEmbed = new MessageEmbed()
          .setTitle(`${Song.formattedDuration} | ${Song.name}`)
          .setDescription(`To select this song, send the page number. Example: 1`)
          .setColor(Bot.Config.Embed.EmbedColor)
          .setURL(Song.url)
          .setImage(Song.thumbnail)

        Pages.push(NewEmbed)
      }

      result.map(song => CreatePage(message, song))

      pagination(message, Pages, ["⬅", "➡"])
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
            icon_url: Bot.user.AvatarURL
          }
        }
      })
    })
}