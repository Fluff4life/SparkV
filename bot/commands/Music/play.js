const Discord = require("discord.js");

const cmd = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
  if (!message.member.voice.channel) {
    return message
      .replyT(`${bot.config.Emojis.error} | You must be in a __**voice channel**__ to use this command!`);
  }

  args = args.join(" ");

  if (!args) {
    return await message.replyT(`${bot.config.Emojis.error} | Please enter a song URL or query to search!`);
  }

  try {
    bot.distube.play(message, args);
  } catch (err) {
    console.error(err);

    await message.replyT(`${bot.config.Emojis.error} | Uh oh! An error occured.`);
  }
}

module.exports = new cmd(execute, {
  description: "Plays a song with the given name or URL.",
  dirname: __dirname,
  usage: "<song title or URL>",
  aliases: ["leap"],
  perms: ["EMBED_LINKS"],
});
