const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = bot.functions.fetchMember(args[0]) || message.author;

  let Ch1llBucks = data.user.money.balance;
  let Bank = data.user.money.bank;
  let BankMax = data.user.money.bankMax;

  const BalanceEmbed = new Discord.MessageEmbed()
    .setTitle(`**${User.tag}'s Balance**`)
    .setDescription(
      `Wallet: ❄${await bot.functions.formatNumber(Ch1llBucks)}\nBank: ❄${await bot.functions.formatNumber(
        Bank,
      )}/${await bot.functions.formatNumber(BankMax)}\nNet Worth: ${await bot.functions.formatNumber(
        Bank + Ch1llBucks,
      )}`,
    )
    .setColor(bot.config.embed.color)
    .setTimestamp();

  message.reply({
    embeds: [BalanceEmbed]
  });
}

module.exports = new cmd(execute, {
  description: `View your balance.`,
  dirname: __dirname,
  aliases: ["bal"],
  usage: `<optional user>`,
});
