const Levels = require("discord-xp");
const Discord = require("discord.js");

const Emotes = ["🥇", "🥈", "🥉"];

(exports.run = async (bot, message, args, command, data) => {
<<<<<<< HEAD
  const RawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
  const Leaderboard = await Levels.computeLeaderboard(bot, RawLeaderboard, true);
  const Leader = Leaderboard.map(
    data =>
      `${Emotes[data.position - 1] || `${"🏅"}`} **Level ${data.level}** - ${data.username}#${data.discriminator}`,
  );
=======
    const RawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
    const Leaderboard = await Levels.computeLeaderboard(
        bot,
        RawLeaderboard,
        true
    );
    const Leader = Leaderboard.map(
        data =>
            `${Emotes[data.position - 1] || `${"🏅"}`} **Level ${
                data.level
            }** - ${data.username}#${data.discriminator}`
    );
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

    const LeaderboardEmbed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}'s Level Leaderboard`)
        .setDescription(Leader.join("\n"))
        .setFooter(
            `${bot.user.username} • ${bot.config.bot.Embed.Footer}`,
            bot.user.displayAvatarURL()
        )
        .setColor(bot.config.bot.Embed.Color);

<<<<<<< HEAD
  message.reply(LeaderboardEmbed);
}),
  (exports.config = {
    name: "LevelLeaderboard",
    description: "View the server's Level leaderboard.",
    aliases: ["levelboard", "llb"],
    usage: "",
    category: "😃Fun😃",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    member_permissions: [],
    enabled: true,
    cooldown: 2.5,
  });
=======
    message.reply(LeaderboardEmbed);
}),
    (exports.config = {
        name: "LevelLeaderboard",
        description: "View the server's Level leaderboard.",
        aliases: ["levelboard", "llb"],
        usage: "",
        category: "😃Fun😃",
        bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
        member_permissions: [],
        enabled: true,
        cooldown: 2.5,
    });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
