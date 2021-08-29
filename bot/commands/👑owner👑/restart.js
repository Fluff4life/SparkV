const Discord = require(`discord.js`);
let restarting = false;

exports.run = async (bot, message, args, command, data) => {
  if (message.author.id !== process.env.OWNERID) {
    return message.reply(`${bot.config.bot.Emojis.error} | Access denied.`);
  }

  if (restarting === true) {
    return;
  }

  const RestartStatus = await message.reply(`⚡ | Ch1llBlox is now preparing for restart. Time left: ${Timer} seconds.`,);
  var Timer = 5;

  setInterval(() => {
    --Timer;

    if (Timer > 0) {
      if (restarting === true) {
        return;
      }

      RestartStatus.edit(
        `⚡ | Ch1llBlox is now preparing for restart. Time left: ${Timer} seconds.`
      );
    } else {
      if (restarting === true) {
        return;
      }

      RestartStatus.edit(`⚡ | Ch1llBlox is now restarting.`)
        .then(msg => {
          restarting = true;

          bot.destroy();
        })
        .then(async () => {
          bot.login(process.env.TOKEN);
          RestartStatus.edit("⚡ | Restart comeplete!");
        });
    }
  }, 1 * 1000);
};

exports.config = {
  name: `Restart`,
  description: `This is an owner only command.`,
  aliases: [],
  usage: ``,
  category: `👑Owner👑`,
  bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
  member_permissions: [],
  enabled: true,
  cooldown: 5,
};
