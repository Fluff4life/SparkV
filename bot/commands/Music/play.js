const Discord = require("discord.js");

const command = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
  if (!message.member.voice.channel) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | You must be in a __**voice channel**__ to use this command!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

    args = args.join(" ");

    if (!args) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | Please enter a song URL or query to search!`
        );
    }

    try {
        bot.distube.play(message, args);
    } catch (err) {
        console.error(err);

    message.reply(`${bot.config.bot.Emojis.error} | Uh oh! An error occured.`);
  }
}

module.exports = new command(execute, {
  description: "Plays a song with the given name or URL.",
  usage: "<song title or URL>",
  aliases: ["leap"],
  perms: ["EMBED_LINKS"],
});
