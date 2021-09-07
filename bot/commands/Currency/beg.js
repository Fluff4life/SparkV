const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  var Ch1llBucks = data.user.money.balance;
  var Multiplier = data.user.money.multiplier;
  const RandomAmmount = Math.floor(Math.random() * 500) + 1;

  if (!Ch1llBucks) {
    Ch1llBucks = 0;
  }

  if (!Multiplier) {
    Multiplier = 1;
  }

  const Ammount = RandomAmmount * Multiplier;

  Ch1llBucks += Ammount;

  message.reply(
    `${bot.config.bot.Emojis.success} | You begged and recieved ${await bot.functions.FormatNumber(
      Ammount,
    )} Ch1llBucks!`,
  );
}

module.exports = new cmd(execute, {
  description: "Beg for coins.",
  dirname: __dirname,
  usage: `<optional user>`,
  aliases: [],
  perms: ["EMBED_LINKS"],
});
