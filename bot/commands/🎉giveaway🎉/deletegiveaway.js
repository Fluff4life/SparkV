const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  const ID = args[0];

  if (!ID || isNaN(ID)) {
    return message.reply(`${bot.config.bot.Emojis.error} | Please provide a valid message ID.`);
  }

  const Giveaway = bot.GiveawayManager.giveaways.find(giveaway => giveaway.messageID === args[0]);

  if (!Giveaway) {
    return message.reply(`I couldn't find a giveaway with that message ID.`);
  }

  bot.GiveawayManager.delete(Giveaway.messageID)
    .then(() => {
      message.reply(`Giveaway successfully deleted!`);
    })
    .catch(err => {
      console.error(err).then(() => {
        message.reply(`An error occured with Ch1llBlox! Please try this command again.`);
      });
    });
},

  exports.config = {
    name: `DeleteGiveaway`,
    description: `Delete a giveaway. Requires the permision MANAGE_MESSAGES.`,
    aliases: [`deleteg`],
    usage: `<MessageID>`,
    category: `🎉giveaway🎉`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [`MANAGE_MESSAGES`],
    enabled: true,
    cooldown: 10
};
