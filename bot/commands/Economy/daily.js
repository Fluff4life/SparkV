const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const RandomAmmount = Math.floor(Math.random() * 3500) + 1;

  let Ch1llBucks = data.user.money.balance;
  let Multiplier = data.user.money.multiplier;

  const Ammount = RandomAmmount * Multiplier;

  data.user.money.balance = Ch1llBucks + Ammount;
  data.markModified("money.balance");
  await data.user.save();

  message.reply(
    `${bot.config.Emojis.success} | You've just earned ❄${await bot.functions.formatNumber(Ammount)} Ch1llBucks!`,
  );
}

module.exports = new cmd(execute, {
  description: "Collect your daily ammount of Ch1llBucks!",
  dirname: __dirname,
  usage: ``,
  aliases: [],
  perms: ["EMBED_LINKS"],
  cooldown: 6000,
});
