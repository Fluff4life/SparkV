const Discord = require(`discord.js`);

const SlotItems = [
  `🍅`,
  `🍇`,
  `🍈`,
  `🍉`,
  `🍊`,
  `🍌`,
  `🍍`,
  `🍑`,
  `🍒`,
  `🍓`,
  `🍋`,
  `🍐`,
  `🍎`,
  `🍏`,
  `🥑`,
  `🥝`,
  `🥭`,
  `🍠`,
  `🍅`,
  `🍆`,
  `🥔`,
  `🥕`,
  `🥒`,
  `💵`,
  `💸`,
  `💰`,
];

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  if (!args) {
    return message.reply(`${bot.config.bot.Emojis.error} | lol you need to tell me how much to bet.`);
  }

  var Ch1llBucks = data.user.money.balance;
  var win = false;

  if (Ch1llBucks === 0 || Ch1llBucks === null) {
    return message.reply(`${bot.config.bot.Emojis.error} | You have no Ch1llBucks!`);
  }

  if (isNaN(args[0])) {
    return message.reply(`${bot.config.bot.Emojis.error} | That's not a number!`);
  }

  if (message.content.includes(`-`)) {
    return message.reply(`${bot.config.bot.Emojis.error} | You cannot bet negitive Ch1llBucks lol.`);
  }

  if (args[0] > Ch1llBucks) {
    return message.reply(`${bot.config.bot.Emojis.error} | You don't have that much lol.`);
  }

  let number = [];

  for (i = 0; i < 3; i++) {
    number[i] = Math.floor(Math.random() * SlotItems.length);
  }

  if (number[0] === number[1] && number[1] === number[2]) {
    args[0] *= 9;
    win = true;
  } else if (number[0] === number[1] || number[0] === number[2] || number[1] === number[2]) {
    args[0] *= 2;
    win = true;
  }

  if (win) {
    message.reply(
      `${SlotItems[number[0]]} | ${SlotItems[number[1]]} | ${SlotItems[number[2]]}\n\n${
        bot.config.bot.Emojis.success
      } | You won ❄${await bot.functions.FormatNumber(parseInt(args[0]) * 4)} Ch1llBucks!`,
    );

    data.user.money.balance = Ch1llBucks + args[0] * SlotItems.length;
    await data.user.save();
  } else {
    message.reply(
      `${SlotItems[number[0]]} | ${SlotItems[number[1]]} | ${SlotItems[number[2]]}\n\n${
        bot.config.bot.Emojis.error
      } | You lost ❄${await bot.functions.FormatNumber(parseInt(args[0]))} Ch1llBucks.`,
    );

    data.user.money.balance = Ch1llBucks - args[0];
    await data.user.save();
  }
}

module.exports = new cmd(execute, {
  description: `Don't gamble kids!`,
  dirname: __dirname,
  usage: `<amount>`,
  aliases: ["bet"],
  perms: ["EMBED_LINKS"],
});
