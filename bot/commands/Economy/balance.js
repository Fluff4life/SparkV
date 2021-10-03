const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = await bot.functions.fetchUser(args[0]) || message.author;

  const BalanceEmbed = new Discord.MessageEmbed()
    .setTitle(`**${User.tag}'s Balance**`)
    .setDescription(
      `Wallet: ❄${bot.functions.formatNumber(data.user.money.balance)}\nBank: ❄${bot.functions.formatNumber(
        data.user.money.bank,
      )}/${bot.functions.formatNumber(data.user.money.bankMax)}\nNet Worth: ${bot.functions.formatNumber(
        data.user.money.bank + data.user.money.balance,
      )}`,
    )
    .setColor(bot.config.embed.color)
    .setTimestamp();

  await message.replyT({
    embeds: [BalanceEmbed],
  });
}

module.exports = new cmd(execute, {
  description: `View your balance.`,
  dirname: __dirname,
  aliases: ["bal"],
  usage: `<optional user>`,
});
