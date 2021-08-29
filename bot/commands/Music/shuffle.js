const Discord = require(`discord.js`);

const command = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
  if (!message.member.voice.channel) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | You must be in a __**voice channel**__ to use this command!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

    if (!bot.distube.isPlaying(message)) {
        return message
            .reply(
                `${bot.config.bot.Emojis.error} | A song must be playing to use this command!`
            )
            .then(m => m.delete({ timeout: 5000 }));
    }

  bot.distube
    .shuffle(message)
    .then(() => message.reply(`${bot.config.bot.Emojis.music} | Okay, I'll shuffle the queue.`))
    .catch(err => message.reply(`${bot.config.bot.Emojis.error} | Uh oh! An error occured.`));
}

module.exports = new command(execute, {
  description: `Shuffles the queue.`,
  usage: "",
  aliases: ["unpause"],
  perms: ["EMBED_LINKS"],
});
