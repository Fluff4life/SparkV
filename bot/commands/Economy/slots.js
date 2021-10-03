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
    return message.reply(`${bot.config.Emojis.error} | lol you need to tell me how much to bet.`);
  }

  let win = false;

  if (data.user.money.balance === 0 || data.user.money.balance === null) {
    return message.reply(`${bot.config.Emojis.error} | You have no data.user.money.balance!`);
  }

  if (isNaN(args[0])) {
    return message.reply(`${bot.config.Emojis.error} | That's not a number!`);
  }

  if (message.content.includes(`-`)) {
    return message.reply(`${bot.config.Emojis.error} | You cannot bet negitive data.user.money.balance lol.`);
  }

  if (args[0] > data.user.money.balance) {
    return message.reply(`${bot.config.Emojis.error} | You don't have that much lol.`);
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
        bot.config.Emojis.success
      } | You won ❄${bot.functions.formatNumber(parseInt(args[0]) * 4)} data.user.money.balance!`,
    );

    data.user.money.balance += args[0] * SlotItems.length;
    data.user.markModified("money.balance");
    await data.user.save();
  } else {
    message.reply(
      `${SlotItems[number[0]]} | ${SlotItems[number[1]]} | ${SlotItems[number[2]]}\n\n${
        bot.config.Emojis.error
      } | You lost ❄${bot.functions.formatNumber(parseInt(args[0]))} data.user.money.balance.`,
    );

    data.user.money.balance -= args[0];
    data.user.markModified("money.balance");

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
