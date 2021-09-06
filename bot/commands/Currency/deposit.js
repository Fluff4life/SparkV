const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  var Ch1llBucks = data.user.money.balance;
  var Bank = data.user.money.bank;
  var BankMax = data.user.money.bankMax;

  if (!args) {
    return message.reply(
      `${bot.config.bot.Emojis.error} | You need to tell me how much you want me to deposit. You can say all if you want all of your Ch1ll Bucks in your bank.`,
    );
  }

  if (args[0].toLowerCase() === `all`) {
    if (Ch1llBucks === 0 || Ch1llBucks === null) {
      return message.reply(`${bot.config.bot.Emojis.error} | You have no Ch1llBucks!`);
    }

    if (Bank === BankMax) {
      return message.reply(`${bot.config.bot.Emojis.error} | Your bank is full!`);
    }

    if (Ch1llBucks > BankMax) {
      data.user.money.bank = Bank + BankMax;
      data.user.money.balance = Ch1llBucks - BankMax;

      await data.user.save();

      message.reply(
        `${bot.config.bot.Emojis.success} | You just deposited ❄${await bot.functions.FormatNumber(BankMax)} into your bank!`,
      );
    } else {
      data.user.money.bank = Bank + Ch1llBucks;
      data.user.money.balance = Ch1llBucks - Ch1llBucks;

      await data.user.save();

      message.reply(
        `${bot.config.bot.Emojis.success} | You just deposited ❄${await bot.functions.FormatNumber(Ch1llBucks)} into your bank!`,
      );
    }
  } else {
    if (!args[0]) {
      return message.reply(`${bot.config.bot.Emojis.error} | lol you can't deposit nothing.`);
    }

    if (isNaN(args[0])) {
      return message.reply(`${bot.config.bot.Emojis.error} | Bruh please say a number.`);
    }

    if (message.content.includes(`-`)) {
      return message.reply(`${bot.config.bot.Emojis.error} | You can't deposit negitive Ch1llBucks lol.`);
    }

    if (Ch1llBucks < args[0]) {
      return message.reply(`${bot.config.bot.Emojis.error} | You don't have that much Ch1llBucks.`);
    }

    if (BankMax < args[0]) {
      return message.reply(`${bot.config.bot.Emojis.error} | You don't have enough bank space to hold ❄${args[0]}!`);
    }

    data.user.money.balance = Ch1llBucks - args[0];
    data.user.money.bank = Bank + args[0];

    await data.user.save();

    message.reply(`${bot.config.bot.Emojis.success} | Deposited ❄${await bot.functions.FormatNumber(args[0])} into bank!`);
  }
}

module.exports = new cmd(execute, {
  description: `Deposit your Ch1llBucks into your bank.`,
  dirname: __dirname,
  usage: `<all or ammount>`,
  aliases: ["dep"],
  perms: ["EMBED_LINKS"],
});
