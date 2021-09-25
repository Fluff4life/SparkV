const Discord = require(`discord.js`);

const cmd = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
  if (!message.member.voice.channel) {
    return message
      .reply(`${bot.config.Emojis.error} | You must be in a __**voice channel**__ to use this command!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!bot.distube.isPlaying(message)) {
    return message
      .reply(`${bot.config.Emojis.error} | A song must be playing to use this command!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  bot.distube
    .shuffle(message)
    .then(() => message.reply(`${bot.config.Emojis.music} | Okay, I'll shuffle the queue.`))
    .catch(err => message.reply(`${bot.config.Emojis.error} | Uh oh! An error occured.`));
}

module.exports = new cmd(execute, {
  description: `Shuffles the queue.`,
  dirname: __dirname,
  usage: "",
  aliases: ["unpause"],
  perms: ["EMBED_LINKS"],
});
