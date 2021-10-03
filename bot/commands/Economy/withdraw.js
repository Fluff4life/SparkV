const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  if (!args) {
    return message.reply(
      `${bot.config.Emojis.error} | You need to tell me how much you want me to withdraw. You can say all if you want all of your Ch1ll Bucks from the bank into your wallet.`,
    );
  }

  if (args[0].toLowerCase() === `all`) {
    if (data.user.money.bank === 0 || data.user.money.bank === null) {
      return message.reply(`${bot.config.Emojis.error} | You have no data.user.money.balance in your bank!`);
    }

    data.user.money.balance += data.user.money.bank;
    data.user.money.bank = 0;

    data.user.markModified("money.balance");
    data.user.markModified("money.bank");
    await data.user.save();

    message.reply(
      `${bot.config.Emojis.success} | You just withdrawed ❄${bot.functions.formatNumber(data.user.money.bank)} from your bank!`,
    );
  } else {
    if (!args[0]) {
      return message.reply(`${bot.config.Emojis.error} | lol you can't withdraw nothing.`);
    }

    if (isNaN(args[0])) {
      return message.reply(`${bot.config.Emojis.error} | Bruh please say a number.`);
    }

    if (message.content.includes(`-`)) {
      return message.reply(`${bot.config.Emojis.error} | You can't withdraw negitive data.user.money.balance lol.`);
    }

    if (data.user.money.bank < args[0]) {
      return message.reply(`${bot.config.Emojis.error} | You don't have that much data.user.money.balance in your bank!`);
    }

    data.user.money.balance += args[0];
    data.user.money.bank -= args[0];

    data.user.markModified("money.balance");
    data.user.markModified("money.bank");
    await data.user.save();

    message.reply(
      `${bot.config.Emojis.success} | Withdrawed ❄${bot.functions.formatNumber(args[0])} from your bank!`,
    );
  }
}

module.exports = new cmd(execute, {
  description: `Withdraw your data.user.money.balance in your bank into your wallet.`,
  dirname: __dirname,
  aliases: ["with"],
  usage: ``,
});
