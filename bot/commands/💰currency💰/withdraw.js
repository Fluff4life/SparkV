const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
    var Ch1llBucks = data.user.money.balance;
    var Bank = data.user.money.bank;

    if (!args) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | You need to tell me how much you want me to withdraw. You can say all if you want all of your Ch1ll Bucks from the bank into your wallet.`
        );
    }

    if (args[0].toLowerCase() === `all`) {
        if (Bank === 0 || Bank === null) {
            return message.reply(
                `${bot.config.bot.Emojis.error} | You have no Ch1llBucks in your bank!`
            );
        }

        data.user.money.balance = Ch1llBucks + Bank;
        data.user.money.bank = 0;

        await data.user.save();

        message.reply(
            `${
                bot.config.bot.Emojis.success
            } | You just withdrawed ❄${await bot.FormatNumber(
                Bank
            )} from your bank!`
        );
    } else {
        if (!args[0]) {
            return message.reply(
                `${bot.config.bot.Emojis.error} | lol you can't withdraw nothing.`
            );
        }

        if (isNaN(args[0])) {
            return message.reply(
                `${bot.config.bot.Emojis.error} | Bruh please say a number.`
            );
        }

        if (message.content.includes(`-`)) {
            return message.reply(
                `${bot.config.bot.Emojis.error} | You can't withdraw negitive Ch1llBucks lol.`
            );
        }

        if (Bank < args[0]) {
            return message.reply(
                `${bot.config.bot.Emojis.error} | You don't have that much Ch1llBucks in your bank!`
            );
        }

        data.user.money.balance = Ch1llBucks + args[0];
        data.user.money.bank = Bank - args[0];

        await data.user.save();

        message.reply(
            `${
                bot.config.bot.Emojis.success
            } | Withdrawed ❄${await bot.FormatNumber(args[0])} from your bank!`
        );
    }
};
exports.config = {
<<<<<<< HEAD
  name: `Withdraw`,
  description: `Withdraw your Ch1llBucks in your bank into your wallet.`,
  aliases: [`with`],
  usage: ``,
  category: `💰Currency💰`,
  bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
  member_permissions: [],
  enabled: true,
  cooldown: 15,
=======
    name: `Withdraw`,
    description: `Withdraw your Ch1llBucks in your bank into your wallet.`,
    aliases: [`with`],
    usage: ``,
    category: `💰Currency💰`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 15,
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
};
