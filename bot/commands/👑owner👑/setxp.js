const Discord = require(`discord.js`);
const Levels = require(`discord-xp`);

exports.run = async (bot, message, args, command, data) => {
    if (message.author.id !== process.env.OWNERID) {
        return message.reply(`${bot.config.bot.Emojis.error} | Access denied.`);
    }

  const User = (await bot.GetMember(message, args)) || bot.users.cache.get(args[0]);
  const Leveling = await bot.dashboard.getVal(`Leveling`);
  const FormattedNumber = await bot.FormatNumber(args[1]);

    if (!Leveling === true) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | Leveling is not enabled for this server. Please enable it by doing \`(prefix)Leveling on\`!`
        );
    }

    try {
        await Levels.setXp(User.id, message.guild.id, args[1]).then(() => {
            message.reply(
                `${bot.config.bot.Emojis.success} | Successfully set ${User}'s XP to ${FormattedNumber}!`
            );
        });
    } catch (err) {
        console.error(err);

        message.reply(
            `${bot.config.bot.Emojis.error} | Error setting ${User}'s XP to ${FormattedNumber}.`
        );
    }
};
exports.config = {
  name: `SetXP`,
  description: `Set XP.`,
  aliases: [],
  usage: `<Ammount>`,
  category: `👑Owner👑`,
  bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`],
  member_permissions: [],
  enabled: true,
  cooldown: 2.5,
};
