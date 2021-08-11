const Discord = require(`discord.js`);

exports.run = async (bot, message) => {
  message.reply(
    `${bot.config.bot.Emojis.success} | Click the following link to view my dashboard! Link: https://ch1llblox.ch1ll.dev/dashboard`,
  );
},

  exports.config = {
    name: `Dashboard`,
    description: `I'll send my dashboard!`,
    aliases: [`dash`],
    usage: ``,
    category: `🧰Utility🧰`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5
};
