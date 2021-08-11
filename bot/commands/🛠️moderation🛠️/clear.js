const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  if (!args) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | Please provide args.`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  try {
    if (args[0].toLowerCase() === `all`) {
        // Yes
        message.delete();

        var messages = await message.channel.messages.fetch({
          limit: 100,
        });

        messages = messages.array();

        if (messages.length > args[0]) {
          messages.length = parseInt(args[0], 10);
        }

        messages = messages.filter(msg => !msg.pinned);
        ++args[0];

        message.delete();
        message.channel.bulkDelete(messages, true);
        message.reply(`Successfully cleared ${messages.length} messages!`).then(m => m.delete({ timeout: 5000 }));
    } else {
      const User = message.mentions.members.first();

      if (User) {
        if (isNaN(args[1])) {
          return message
            .reply(`${bot.config.bot.Emojis.error} | That's not a number.`)
            .then(m => m.delete({ timeout: 5000 }));
        }
      }

      if (isNaN(parseInt(args[0])) === true) {
        return message
          .reply(`${bot.config.bot.Emojis.error} | That's not a number.`)
          .then(m => m.delete({ timeout: 5000 }));
      }

      var messages = await message.channel.messages.fetch({
        limit: args[1] || args[0],
      });

      messages = messages.array();

      if (User) {
        messages = messages.filter(msg => msg.author.id === User.id);
      }

      if (messages.length > args[1]) {
        messages.length = parseInt(args[1], 10);
      }

      messages = messages.filter(msg => !msg.pinned);
      ++args[1];
      message.delete();
      message.channel.bulkDelete(messages, true);

      if (User) {
        message
          .reply(
            `${bot.config.bot.Emojis.success} | Successfully cleared ${messages.length} messages from ${User.tag}!`,
          )
          .then(m => m.delete({ timeout: 5000 }));
      } else {
        message
          .reply(`${bot.config.bot.Emojis.success} | Successfully cleared ${messages.length} messages!`)
          .then(m => m.delete({ timeout: 5000 }));
      }
    }
  } catch {}
  // Normally, it will catch an Unknown Message error. We prevent this by not logging that error because I am too lazy to find a better solution.
},

  exports.config = {
    name: `Clear`,
    description: `I'll delete messages for you!`,
    aliases: [`purge`, `clr`],
    usage: `<all or number or user> <if user then number>`,
    category: `🛠️Moderation🛠️`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `MANAGE_MESSAGES`],
    member_permissions: [`MANAGE_MESSAGES`],
    enabled: true,
    cooldown: 5
};
