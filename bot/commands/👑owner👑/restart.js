const Discord = require(`discord.js`);
let restarting = false;

exports.run = async (bot, message, args, command, data) => {
<<<<<<< HEAD
  if (message.author.id !== process.env.OWNERID) {
    return message.reply(`${bot.config.bot.Emojis.error} | Access denied.`);
  }

  if (restarting === true) {
    return;
  }

  const RestartStatus = await message.reply(
    `⚡ | Ch1llBlox is now preparing for restart. Time left: ${Timer} seconds.`,
  );
  var Timer = 5;

  setInterval(() => {
    --Timer;

    if (Timer > 0) {
      if (restarting === true) {
        return;
      }
=======
    if (message.author.id !== process.env.OWNERID) {
        return message.reply(`${bot.config.bot.Emojis.error} | Access denied.`);
    }
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

    if (restarting === true) {
        return;
<<<<<<< HEAD
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
=======
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
    }

    const RestartStatus = await message.reply(
        `⚡ | Ch1llBlox is now preparing for restart. Time left: ${Timer} seconds.`
    );
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
<<<<<<< HEAD
  name: `Restart`,
  description: `This is an owner only command.`,
  aliases: [],
  usage: ``,
  category: `👑Owner👑`,
  bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
  member_permissions: [],
  enabled: true,
  cooldown: 5,
=======
    name: `Restart`,
    description: `This is an owner only command.`,
    aliases: [],
    usage: ``,
    category: `👑Owner👑`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 5,
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
};
