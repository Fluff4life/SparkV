const Discord = require(`discord.js`);

(exports.run = async (bot, message, args, command, data) => {
<<<<<<< HEAD
  const User = bot.GetMember(message, args) || message.author;
=======
    const User = bot.GetMember(message, args) || message.author;
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

    var Ch1llBucks = data.user.money.balance;
    var Bank = data.user.money.bank;
    var BankMax = data.user.money.bankMax;

    const BalanceEmbed = new Discord.MessageEmbed()
        .setTitle(`**${User.tag}'s Balance**`)
        .setDescription(
            `Wallet: ❄${await bot.FormatNumber(
                Ch1llBucks
            )}\nBank: ❄${await bot.FormatNumber(Bank)}/${await bot.FormatNumber(
                BankMax
            )}\nNet Worth: ${await bot.FormatNumber(Bank + Ch1llBucks)}`
        )
        .setColor(bot.config.bot.Embed.Color)
        .setTimestamp();

<<<<<<< HEAD
  message.reply(BalanceEmbed);
}),
  (exports.config = {
    name: `Balance`,
    description: `View your balance.`,
    aliases: [`bal`],
    usage: `<optional user>`,
    category: `💰Currency💰`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 2,
  });
=======
    message.reply(BalanceEmbed);
}),
    (exports.config = {
        name: `Balance`,
        description: `View your balance.`,
        aliases: [`bal`],
        usage: `<optional user>`,
        category: `💰Currency💰`,
        bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
        member_permissions: [],
        enabled: true,
        cooldown: 2,
    });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
