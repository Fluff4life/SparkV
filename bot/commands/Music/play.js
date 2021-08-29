const Discord = require("discord.js");

<<<<<<< HEAD:bot/commands/Music/play.js
const command = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
  if (!message.member.voice.channel) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | You must be in a __**voice channel**__ to use this command!`)
      .then(m => m.delete({ timeout: 5000 }));
  }
=======
(exports.run = async (bot, message, args, command, data) => {
    if (!message.member.voice.channel) {
        return message
            .reply(
                `${bot.config.bot.Emojis.error} | You must be in a __**voice channel**__ to use this command!`
            )
            .then(m => m.delete({ timeout: 5000 }));
    }
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89:bot/commands/🎵music🎵/play.js

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

<<<<<<< HEAD:bot/commands/Music/play.js
    message.reply(`${bot.config.bot.Emojis.error} | Uh oh! An error occured.`);
  }
}

module.exports = new command(execute, {
  description: "Plays a song with the given name or URL.",
  usage: "<song title or URL>",
  aliases: ["leap"],
  perms: ["EMBED_LINKS"],
});
=======
        message.reply(
            `${bot.config.bot.Emojis.error} | Uh oh! An error occured.`
        );
    }
}),
    (exports.config = {
        name: "Play",
        description: "Plays a song with the given name or URL.",
        aliases: ["p"],
        usage: "<song title or URL>",
        category: "🎵Music🎵",
        bot_permissions: [
            "SEND_MESSAGES",
            "READ_MESSAGE_HISTORY",
            "EMBED_LINKS",
            "VIEW_CHANNEL",
            "CONNECT",
            "SPEAK",
        ],
        member_permissions: [],
        enabled: true,
        cooldown: 5,
    });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89:bot/commands/🎵music🎵/play.js
