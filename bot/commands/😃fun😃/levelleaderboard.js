const Levels = require("discord-xp");
const Discord = require("discord.js");

const cmd = require("../../templates/command");

const Emotes = ["🥇", "🥈", "🥉"];

async function execute(bot, message, args, command, data) {
  const RawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
  const Leaderboard = await Levels.computeLeaderboard(bot, RawLeaderboard, true);
  const Leader = Leaderboard.map(
    data =>
      `${Emotes[data.position - 1] || `${"🏅"}`} **Level ${data.level}** - ${data.username}#${data.discriminator}`,
  );

  const LeaderboardEmbed = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name}'s Level Leaderboard`)
    .setDescription(Leader.join("\n"))
    .setFooter(`${bot.user.username} • ${bot.config.bot.Embed.Footer}`, bot.user.displayAvatarURL())
    .setColor(bot.config.bot.Embed.Color);

  message.reply(LeaderboardEmbed);
}

module.exports = new cmd(execute, {
  description: `Just a little fun.`,
  aliases: ["levelboard", "llb"],
  usage: ``
});
