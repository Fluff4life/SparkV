const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  if (!args) {
    return message.reply(
      `${bot.config.Emojis.error} | You need to tell me how much you want me to deposit. You can say all if you want all of your Ch1ll Bucks in your bank.`,
    );
  }

  if (args[0].toLowerCase() === `all`) {
    if (data.user.money.balance === 0 || data.user.money.balance === null) {
      return message.reply(`${bot.config.Emojis.error} | You have no data.user.money.balance!`);
    }

    if (data.user.money.bank === data.user.money.bankMax) {
      return message.reply(`${bot.config.Emojis.error} | Your bank is full!`);
    }

    if (data.user.money.balance > data.user.money.bankMax) {
      data.user.money.bank += data.user.money.bankMax;
      data.user.money.balance -= data.user.money.bankMax;

      data.markModified("money.bank");
      data.markModified("money.balance");
      await data.user.save();

      message.reply(
        `${bot.config.Emojis.success} | You just deposited ❄${bot.functions.formatNumber(
          data.user.money.bankMax,
        )} into your bank!`,
      );
    } else {
      data.user.money.bank += data.user.money.balance;
      data.user.money.balance -= data.user.money.balance;

      data.user.markModified("money.bank");
      data.user.markModified("money.balance");
      await data.user.save();

      message.reply(
        `${bot.config.Emojis.success} | You just deposited ❄${bot.functions.formatNumber(
          data.user.money.balance,
        )} into your bank!`,
      );
    }
  } else {
    if (!args[0]) {
      return message.reply(`${bot.config.Emojis.error} | lol you can't deposit nothing.`);
    }

    if (isNaN(args[0])) {
      return message.reply(`${bot.config.Emojis.error} | Bruh please say a number.`);
    }

    if (message.content.includes(`-`)) {
      return message.reply(`${bot.config.Emojis.error} | You can't deposit negitive data.user.money.balance lol.`);
    }

    if (data.user.money.balance < args[0]) {
      return message.reply(`${bot.config.Emojis.error} | You don't have that much data.user.money.balance.`);
    }

    if (data.user.money.bankMax < args[0]) {
      return message.reply(`${bot.config.Emojis.error} | You don't have enough bank space to hold ❄${args[0]}!`);
    }

    data.user.money.balance -= args[0];
    data.user.money.bank += args[0];

    data.user.markModified("money.balance");
    data.user.markModified("money.bank");
    await data.user.save();

    message.reply(`${bot.config.Emojis.success} | Deposited ❄${bot.functions.formatNumber(args[0])} into bank!`);
  }
}

module.exports = new cmd(execute, {
  description: `Deposit your data.user.money.balance into your bank.`,
  dirname: __dirname,
  usage: `<all or ammount>`,
  aliases: ["dep"],
  perms: ["EMBED_LINKS"],
});
