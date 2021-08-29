const Discord = require(`discord.js`);

<<<<<<< HEAD:bot/commands/Music/resume.js
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
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89:bot/commands/🎵music🎵/resume.js

    let queue = await bot.distube.getQueue(message);

    if (!queue) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | No songs was ever/still is paused.`
        );
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
}),
    (exports.config = {
        name: `Resume`,
        description: `Resume playing the current song.`,
        aliases: [`unpause`],
        usage: ``,
        category: `🎵Music🎵`,
        bot_permissions: [
            `SEND_MESSAGES`,
            `READ_MESSAGE_HISTORY`,
            `EMBED_LINKS`,
            `VIEW_CHANNEL`,
            `CONNECT`,
            `SPEAK`,
        ],
        member_permissions: [],
        enabled: true,
        cooldown: 5,
    });
<<<<<<< HEAD:bot/commands/Music/resume.js
  });
}

module.exports = new command(execute, {
  description: `Resume playing the current song.`,
  usage: "",
  aliases: ["unpause"],
  perms: ["EMBED_LINKS"],
});
=======
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89:bot/commands/🎵music🎵/resume.js
