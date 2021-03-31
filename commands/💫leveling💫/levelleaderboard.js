const Discord = require("discord.js");
const Levels = require("discord-xp")

const Emotes = [
  "🥇",
  "🥈",
  "🥉"
]

exports.run = async (Bot, message, Arguments) => {
  const RawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10)
  const Leaderboard = await Levels.computeLeaderboard(Bot, RawLeaderboard, true)
  const Leader = Leaderboard.map(data => `${Emotes[data.position - 1] || `${"🔹"}`} **Level ${data.level}** - ${data.username}#${data.discriminator}`)

  const LeaderboardEmbed = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name}'s Level Leaderboard`)
    .setDescription(Leader.join("\n"))
    .setFooter(Bot.user.username, Bot.user.displayAvatarURL())
    .setColor(Bot.Config.Embed.EmbedColor)

  message.channel.send(LeaderboardEmbed)
},

exports.config = {
  name: "LevelLeaderboard",
  description: "View the server's Level leaderboard.",
  aliases: ["levelboard", "llb"],
  usage: "",
  category: "💫leveling💫",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  member_permissions: [],
  enabled: true,
  cooldown: 2.5
}