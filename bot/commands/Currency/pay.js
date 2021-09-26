const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = await bot.functions.GetMember(message, args);

  if (!args) {
    return message.reply(`${bot.config.Emojis.error} | You need to mention someone to pay and how much.`);
  }

  if (!User) {
    return message.reply(`${bot.config.Emojis.error} | I cannot find the user.`);
  }

  if (User.id === message.author.id) {
    return message.reply(`${bot.config.Emojis.error} | You can't give money to yourself lol.`);
  }

  if (isNaN(args[1])) {
    return message.reply(`${bot.config.Emojis.error} | That's not a number!`);
  }

  if (message.content.includes(`-`)) {
    return message.reply(`${bot.config.Emojis.error} | You cannot give a user negitive Ch1llBucks lol.`);
  }

  let Ch1llBucks = data.user.money.balance;
  let UserCh1llBucks = await bot.database.fetchUser(User.id);

  if (Ch1llBucks < args[1]) {
    return message.reply(`${bot.config.Emojis.error} | You don't have that much money!`);
  }

  UserCh1llBucks.money.balance = UserCh1llBucks + parseInt(args[1]);
  data.user.money.balance = Ch1llBucks - parseInt(args[1]);

  UserCh1llBucks.save();
  await data.user.save();

  message.reply(
    `${bot.config.Emojis.success} | You gave ${User} ❄${await bot.functions.FormatNumber(args[1])} Ch1llBucks!`,
  );
}

module.exports = new cmd(execute, {
  description: `Give someone some Ch1llBucks!`,
  dirname: __dirname,
  usage: `<user>`,
  aliases: ["gift"],
  perms: ["EMBED_LINKS"],
});
