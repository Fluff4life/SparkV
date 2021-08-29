const Discord = require(`discord.js`);

(exports.run = async (bot, message, args, command, data) => {
    if (!message.member.voice.channel) {
        return message
            .reply(
                `${bot.config.bot.Emojis.error} | You must be in a __**voice channel**__ to use this command!`
            )
            .then(m => m.delete({ timeout: 5000 }));
    }

    if (!bot.distube.isPlaying(message)) {
        return message
            .reply(
                `${bot.config.bot.Emojis.error} | A song must be __**playing**__ to use this command!`
            )
            .then(m => m.delete({ timeout: 5000 }));
    }

    bot.distube
        .seek(message, parseInt(args[0]))
        .then(() => {
            message.reply(
                `${bot.config.bot.Emojis.music} | Okay, I set the track's position to ${args[0]}.`
            );
        })
        .catch(err =>
            message.reply(
                `${bot.config.bot.Emojis.error} | Uh oh! An error occured.`
            )
        );
}),
    (exports.config = {
        name: `Seek`,
        description: `Change the current track's position.`,
        aliases: [],
        usage: `<number>`,
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
