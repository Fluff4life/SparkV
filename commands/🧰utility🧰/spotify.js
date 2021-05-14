const Discord = require("discord.js");

exports.run = async (Bot, message, args) => {
  const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

  if (!user){
    return message.lineReply("I cannot find this user!")
  }

  let status

  if (user.presence.activities.length === 1){
    status = user.presence.activities[0]
  } else if (user.presence.activities.length > 1){
    status = user.presence.activities[1]
  }

  if (user.presence.activities.length === 0 || !status.name === "Spotify" && !status.type === "LISTENING") {
    return message.lineReply("This user isn't listening to Spotify!")
  }

  if (!status === null && status.type === "LISTENING" && status.name === "Spotify" && !status.assets === null){
    const card = new canvacord.Spotify()
      .setTitle(status.details)
      .setAuthor(status.state)
      .setAlbum(status.assets.largeText)
      .setImage(`https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`)
      .setStartTimestamp(status.timestamps.start)
      .setEndTimestamp(status.timestamps.end)

    card.build().then(data => {
      const Attachment = new Discord.MessageAttachment(data, `${user.user.tag}Spotify.png`)

      return message.lineReply(Attachment)
    });
  }
},

exports.config = {
  name: "Spotify",
  description: "See if a user is using spotify.",
  aliases: ["spot"],
  usage: "<user>",
  category: "🧰utility🧰",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 1.5
}