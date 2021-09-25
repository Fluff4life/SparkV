const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  if (message.author.id !== process.env.OWNERID) {
    return message.reply(`${bot.config.Emojis.error} | Access denied.`);
  }

  const User = await bot.GetMember(message, args);

  if (!User) {
    return message.reply;
  }

  data.user.money.balance = args[1];
  await data.user.save();

  message.reply(`${bot.config.Emojis.success} | Success!`);
}

module.exports = new cmd(execute, {
  description: `Set someone's Ch1llBucks!`,
  aliases: [],
  dirname: __dirname,
  usage: `<user> <ammount>`,
});
