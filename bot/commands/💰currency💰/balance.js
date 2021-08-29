const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = bot.GetMember(message, args) || message.author;

  var Ch1llBucks = data.user.money.balance;
  var Bank = data.user.money.bank;
  var BankMax = data.user.money.bankMax;

  const BalanceEmbed = new Discord.MessageEmbed()
    .setTitle(`**${User.tag}'s Balance**`)
    .setDescription(
      `Wallet: ❄${await bot.FormatNumber(Ch1llBucks)}\nBank: ❄${await bot.FormatNumber(Bank)}/${await bot.FormatNumber(
        BankMax,
      )}\nNet Worth: ${await bot.FormatNumber(Bank + Ch1llBucks)}`,
    )
    .setColor(bot.config.bot.Embed.Color)
    .setTimestamp();

  message.reply(BalanceEmbed);
}

module.exports = new cmd(execute, {
  description: `View your balance.`,
  aliases: ["bal"],
  usage: `<optional user>`,
});
