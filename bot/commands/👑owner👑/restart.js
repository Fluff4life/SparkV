const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  if (message.author.id !== process.env.OwnerID) {
    return message.reply(`${bot.config.bot.Emojis.error} | Access denied.`);
  }

  const RestartStatus = await message.reply(`⚡ Ch1llBlox is now preparing for restart. Time left: ${Timer} seconds.`);
  var Timer = 15;

  setInterval(() => {
    --Timer;

    if (Timer > 0) {
      RestartStatus.edit(`⚡ Ch1llBlox is now preparing for restart. Time left: ${Timer} seconds.`);
    } else {
      RestartStatus.edit(
        `⚡ Ch1llBlox is now restarting. If sharding is disabled, he will shutdown and won't come back on again until you restart him yourself.`,
      );
      process.exit();
    }
  }, 1000);
};
  exports.config = {
    name: `Restart`,
    description: `This is an owner only command.`,
    aliases: [],
    usage: ``,
    category: `👑owner👑`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 5
};
