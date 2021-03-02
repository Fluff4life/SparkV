const { MessageEmbed } = require("discord.js")
const pagination = require("discord.js-pagination")

module.exports = async (Bot) => {
  const DisTube = require("distube")
  const canvacord = require("canvacord")



  Bot.distube = new DisTube(Bot, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true })

  Bot.distube
    .on("playSong", (message, queue, song) => {
      message.channel.send({
        embed: {
          title: `🎵 Now Playing ${song.name}🎵`,
          description: `Added by ${song.user || "unknown"}`,
          color: "#0099ff",

          url: song.url,

          fields: [
            {
              name: `▶Views`,
              value: song.views,
              inline: true,
            },

            {
              name: `👍Likes`,
              value: song.likes,
              inline: true,
            },

            {
              name: `👎Dislikes`,
              value: song.dislikes,
              inline: true,
            },
          ],

          thumbnail: {
            url: song.thumbnail
          },

          footer: {
            text: `😀 ${song.formattedDuration}`,
            icon_url: process.env.bot_logo
          },
        }
      })
    })
    .on("addSong", (message, queue, song) => {
      message.channel.send({
        embed: {
          title: `Added ${song.name} to queue`,
          description: `Added by ${song.user || "unknown"}`,
          color: "#0099ff",

          url: song.url,

          thumbnail: {
            url: song.thumbnail
          },

          footer: {
            text: `\`${song.formattedDuration}\``,
            icon_url: process.env.bot_logo
          },
        }
      })
    })
    .on("playList", (message, queue, playlist, song) => {
      message.channel.send(message.channel.send({
        embed: {
          title: `Playing ${playlist.name}`,
          description: `Added by ${song.user || "unknown"}`,
          color: "#0099ff",

          thumbnail: {
            url: song.thumbnail
          },

          url: song.url,

          footer: {
            text: `(${playlist.songs.length} songs) - Now Playing ${song.name} (\`${song.formattedDuration}\)`,
            icon_url: process.env.bot_logo
          },
        }
      }))
    })
    .on("addList", (message, queue, playlist) => {
      message.channel.send(message.channel.send({
        embed: {
          title: `Added ${playlist.name} to Queue`,
          description: `😀Added by ${playlist.user || "unknown"}`,
          color: "#0099ff",

          footer: {
            text: `${playlist.songs.length} songs (\`${playlist.formattedDuration}\`)`,
            icon_url: process.env.bot_logo
          },
        }
      }))
    })
    .on("finish", (message) => {
      message.channel.send("No songs left in queue. Add more songs!").then(m => m.delete({ timeout: 2000 }))
    })
    .on("noRelated", (message) => {
      message.channel.send("I cannot find a related video to play. I am stopping the music.").then(m => m.delete({ timeout: 2000 }))
    })
    .on("searchResult", (message, result) => {
      let Pages = []

      const CreatePage = (Message, Song) => {
        const NewEmbed = new MessageEmbed()
          .setTitle(`${Song.formattedDuration} | ${Song.name}`)
          .setDescription(`To select this song, send the page number.`)
          .setColor("#0099ff")
          .setURL(Song.url)

          .setImage(Song.thumbnail)

        Pages.push(NewEmbed)
      }

      result.map(song => CreatePage(message, song))

      pagination(message, Pages, ["⬅", "➡"])
    })
    .on("seachCancel", (message) => {
      message.channel.send(`Seaching canceled.`)
    })

    .on("empty", (message) => {
      message.channel.send("Voice chat is empty. Leaving the VC.").then(m => m.delete({ timeout: 2000 }))
    })
    .on("error", (message, err) => {
      console.error(err)

      message.channel.send({
        embed: {
          title: `Error Occured!`,
          description: err,
          color: "#0099ff",

          footer: {
            text: `Music command failed.`,
            icon_url: process.env.bot_logo
          }
        }
      })
    })
}