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
    return message.reply(`${bot.config.Emojis.error} | You cannot give a user negitive data.user.money.balance lol.`);
  }

  let UserMoney = await bot.database.fetchUser(User.id);

  if (data.user.money.balance < args[1]) {
    return message.reply(`${bot.config.Emojis.error} | You don't have that much money!`);
  }

  UserMoney.money.balance = UserMoney + parseInt(args[1]);
  data.user.money.balance -= parseInt(args[1]);

  data.user.markModified("money.balance");
  UserMoney.markModified("money.balance");
  UserMoney.save();
  await data.user.save();

  message.reply(
    `${bot.config.Emojis.success} | You gave ${User} ❄${bot.functions.formatNumber(args[1])} data.user.money.balance!`,
  );
}

module.exports = new cmd(execute, {
  description: `Give someone some data.user.money.balance!`,
  dirname: __dirname,
  usage: `<user>`,
  aliases: ["gift"],
  perms: ["EMBED_LINKS"],
});
