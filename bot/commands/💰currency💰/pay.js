const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  const User = await bot.GetMember(message, args);

  if (!args) {
    return message.reply(`${bot.config.bot.Emojis.error} | You need to mention someone to pay and how much.`);
  }

  if (!User) {
    return message.reply(`${bot.config.bot.Emojis.error} | I cannot find the user.`);
  }

  if (User.id === message.author.id) {
    return message.reply(`${bot.config.bot.Emojis.error} | You can't give money to yourself lol.`);
  }

  if (isNaN(args[1])) {
    return message.reply(`${bot.config.bot.Emojis.error} | That's not a number!`);
  }

  if (message.content.includes(`-`)) {
    return message.reply(`${bot.config.bot.Emojis.error} | You cannot give a user negitive Ch1llBucks lol.`);
  }

  var Ch1llBucks = data.user.money.balance;
  var UserCh1llBucks = await bot.database.fetchUser(User.id);

  if (Ch1llBucks < args[1]) {
    return message.reply(`${bot.config.bot.Emojis.error} | You don't have that much money!`);
  }

  UserCh1llBucks.money.balance = UserCh1llBucks + parseInt(args[1]);
  data.user.money.balance = Ch1llBucks - parseInt(args[1]);

  UserCh1llBucks.save();
  await data.user.save();

  message.reply(`${bot.config.bot.Emojis.success} | You gave ${User} ❄${await bot.FormatNumber(args[1])} Ch1llBucks!`);
};
exports.config = {
  name: `Pay`,
  description: `Give someone some Ch1llBucks!`,
  aliases: [`gift`],
  usage: `<user>`,
  category: `💰Currency💰`,
  bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
  member_permissions: [],
  enabled: true,
  cooldown: 15,
};
