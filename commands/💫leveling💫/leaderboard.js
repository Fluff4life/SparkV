const Discord = require("discord.js");
const Levels = require("discord-xp")

exports.run = async (Bot, message, Arguments) => {
  const Leveling = await Bot.Database.get(`ServerData_${message.guild.id}.Leveling`)

  if (!Leveling || !Leveling === "on"){
    return message.channel.send("Leveling is not enabled for this server. Please enable it by doing `(prefix)Leveling on`!")
  }

  const RawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10)
  
  if (RawLeaderboard.length < 1){
    return message.reply("nobody's on the leaderboard yet.")
  }

  const Leaderboard = await Levels.computeLeaderboard(Bot, RawLeaderboard, true)
  const Leader = Leaderboard.map(data => `\`${FormatNumber(data.position.toNumber())}\`. ${FormatNumber(data.level.toNumber())} - ${data.username}#${data.discriminator}`)

  const LeaderboardEmbed = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name}'s Level Leaderboard`)
    .setDescription(Leader.join("\n"))
    .setFooter(process.env.name, process.env.AvatarURL)
    .setColor("#0099ff")

  message.channel.send(LeaderboardEmbed)
},

exports.config = {
  name: "Leaderboard",
  description: "View the server's Level leaderboard.",
  aliases: [],
  usage: "",
  category: "💫leveling💫",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  member_permissions: [],
  enabled: true,
  cooldown: 2.5
}