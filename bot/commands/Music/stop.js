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

  let queue = await bot.distube.getQueue(message);

  if (queue) {
    bot.distube.stop(message);

    message.reply({
      embed: {
        title: `${bot.config.Emojis.error} | Stopped Song`,
        description: `Stopped currently playing song.`,
        color: `#0099ff`,

        thumbnail: {
          url: `https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/YouTube.jpg`,
        },

        footer: {
          text: `Stopped song`,
          icon_url: bot.user.displayAvatarURL(),
        },
      },
    });
  }
}

module.exports = new cmd(execute, {
  description: `Disconnects me from the voice channel and removes all songs in queue.`,
  dirname: __dirname,
  usage: "",
  aliases: ["disconnect", "leave"],
  perms: ["EMBED_LINKS"],
});
