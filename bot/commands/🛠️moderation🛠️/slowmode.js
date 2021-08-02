const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  const Channel = message.mentions.channels
    .filter(channel => channel.type === `text` && channel.guild.id === message.guild.id)
    .first();

  if (!Channel) {
    return message.reply(`${bot.config.bot.Emojis.error} | You cannot set slowmode in an announcements channel.`);
  }

  if (isNaN(args[0])) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | That's not a nunber.`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (args[0] > 21600) {
    return message.reply(
      `${bot.config.bot.Emojis.error} | That's too high of a number! This is due to discord limiting slowmode up to 6 hours.`,
    );
  }

  message.channel.setRateLimitPerUser(args[0]);
  message.reply(`${bot.config.bot.Emojis.success} | Slowmode is now ${args[0]} seconds.`);
};

  exports.config = {
    name: `Slowmode`,
    description: `I will set the channel's slowmode to anything you want.`,
    aliases: [`slow`],
    usage: `<ammount>`,
    category: `🛠️moderation🛠️`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `MANAGE_MESSAGES`, `MANAGE_CHANNELS`],
    member_permissions: [`MANAGE_MESSAGES`],
    enabled: true,
    cooldown: 5
};
