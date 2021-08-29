const Discord = require(`discord.js`);

const cmd = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
  const queue = bot.distube.getQueue(message);

  if (!queue) {
    return message.reply(`${bot.config.bot.Emojis.error} | The queue is empty! Try adding some songs.`);
  }

  message.reply({
    embed: {
      title: `${bot.config.bot.Emojis.music} | Queue for ${message.guild.name}`,
      description: queue.songs
        .map((song, id) => `**${id + 1}**. ${song.name} - ${song.formattedDuration}`)
        .slice(0, 10)
        .join(`\n`),
      color: `#0099ff`,
      thumbnail: {
        url: message.author.displayAvatarURL({
          dynamic: true,
          format: "gif",
        }),
      },
      footer: {
        text: `Displaying music queue.`,
        icon_url: bot.user.displayAvatarURL(),
      },
    },
  });
}

module.exports = new cmd(execute, {
  description: `Shows the songs in queue.`,
  usage: "<number>",
  aliases: ["que"],
  perms: ["EMBED_LINKS"],
});
