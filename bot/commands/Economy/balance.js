const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = bot.functions.fetchUser(args[0]) || message.author;

  let Coins = data.user.money.balance;
  let Bank = data.user.money.bank;
  let BankMax = data.user.money.bankMax;

  const BalanceEmbed = new Discord.MessageEmbed()
    .setTitle(`**${User.tag}'s Balance**`)
    .setDescription(
      `Wallet: ❄${bot.functions.formatNumber(Coins)}\nBank: ❄${bot.functions.formatNumber(
        Bank,
      )}/${bot.functions.formatNumber(BankMax)}\nNet Worth: ${bot.functions.formatNumber(
        Bank + Coins,
      )}`,
    )
    .setColor(bot.config.embed.color)
    .setTimestamp();

  message.reply({
    embeds: [BalanceEmbed],
  });
}

module.exports = new cmd(execute, {
  description: `View your balance.`,
  dirname: __dirname,
  aliases: ["bal"],
  usage: `<optional user>`,
});
