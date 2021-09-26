const Discord = require(`discord.js`);
const Levels = require(`discord-xp`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  if (message.author.id !== process.env.OWNERID) {
    return message.reply(`${bot.config.Emojis.error} | Access denied.`);
  }

  const User = (await bot.functions.GetMember(message, args)) || bot.users.cache.get(args[0]);
  const Leveling = await bot.dashboard.getVal(`Leveling`);
  const FormattedNumber = await bot.functions.FormatNumber(args[1]);

  if (!Leveling === true) {
    return message.reply(
      `${bot.config.Emojis.error} | Leveling is not enabled for this server. Please enable it by doing \`(prefix)Leveling on\`!`,
    );
  }

  try {
    await Levels.setXp(User.id, message.guild.id, args[1]).then(() => {
      message.reply(`${bot.config.Emojis.success} | Successfully set ${User}'s XP to ${FormattedNumber}!`);
    });
  } catch (err) {
    console.error(err);

    message.reply(`${bot.config.Emojis.error} | Error setting ${User}'s XP to ${FormattedNumber}.`);
  }
}

module.exports = new cmd(execute, {
  description: `Set XP.`,
  aliases: [],
  dirname: __dirname,
  usage: `<user> <ammount>`,
});
