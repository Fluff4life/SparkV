const Discord = require(`discord.js`);

const cmd = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
  if (!message.member.voice.channel) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | You must be in a __**voice channel**__ to use this command!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  let queue = await bot.distube.getQueue(message);

  if (!queue) {
    return message.reply(`${bot.config.bot.Emojis.error} | No songs was ever/still is paused.`);
  }

  bot.distube.resume(message).then(() => {
    message.reply({
      embed: {
        title: `${bot.config.bot.Emojis.music} | Resumed`,
        description: `Resumed song`,
        color: `#0099ff`,
      },
    });
  });
}

module.exports = new cmd(execute, {
  description: `Resume playing the current song.`,
  dirname: __dirname,
  usage: "",
  aliases: ["unpause"],
  perms: ["EMBED_LINKS"],
});
