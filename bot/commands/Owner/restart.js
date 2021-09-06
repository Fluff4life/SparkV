const Discord = require(`discord.js`);
let restarting = false;

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
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

      RestartStatus.edit(`⚡ | Ch1llBlox is now preparing for restart. Time left: ${Timer} seconds.`);
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
}

module.exports = new cmd(execute, {
  description: `This is an owner only command.`,
  aliases: [],
  dirname: __dirname,
  usage: `<ch1llbucks>`,
});
