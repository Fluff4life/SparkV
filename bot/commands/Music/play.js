const Discord = require("discord.js");

const cmd = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
  if (!message.member.voice.channel) {
    return message
      .reply(`${bot.config.Emojis.error} | You must be in a __**voice channel**__ to use this command!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  args = args.join(" ");

  if (!args) {
    return message.reply(`${bot.config.Emojis.error} | Please enter a song URL or query to search!`);
  }

  try {
    bot.distube.play(message, args);
  } catch (err) {
    console.error(err);

    message.reply(`${bot.config.Emojis.error} | Uh oh! An error occured.`);
  }
}

module.exports = new cmd(execute, {
  description: "Plays a song with the given name or URL.",
  dirname: __dirname,
  usage: "<song title or URL>",
  aliases: ["leap"],
  perms: ["EMBED_LINKS"],
});
