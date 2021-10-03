const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const RandomAmmount = Math.floor(Math.random() * 3500) + 1;
  const Ammount = RandomAmmount * data.user.money.multiplier;

  data.user.money.balance += Ammount;
  data.user.markModified("money.balance");
  await data.user.save();

  message.reply(
    `${bot.config.Emojis.success} | You've just earned ❄${bot.functions.formatNumber(Ammount)} coins!`,
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
