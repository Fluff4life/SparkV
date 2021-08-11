const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  if (!args) {
    return message.reply(`${bot.config.bot.Emojis.error} | Bruh I cannot reverse no text lol.`);
  }

  message.reply(args.join(` `).split(``).reverse()
.join(``));
};

  exports.config = {
    name: `Reverse`,
    description: `I will reverse any text you give me lol.`,
    aliases: [`talk`],
    usage: `<message>`,
    category: `😃Fun😃`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `MANAGE_MESSAGES`],
    member_permissions: [],
    enabled: true,
    cooldown: 5
};
