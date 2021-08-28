const Discord = require(`discord.js`);

(exports.run = async (bot, message, args, command, data) => {
    if (!message.member.voice.channel) {
        return message
            .reply(
                `${bot.config.bot.Emojis.error} | You must be in a __**voice channel**__ to use this command!`
            )
            .then((m) => m.delete({ timeout: 5000 }));
    }

    if (!bot.distube.isPlaying(message)) {
        return message
            .reply(
                `${bot.config.bot.Emojis.error} | A song must be playing to use this command!`
            )
            .then((m) => m.delete({ timeout: 5000 }));
    }

    let queue = await bot.distube.getQueue(message);

    if (queue) {
        bot.distube.stop(message);

        message.reply({
            embed: {
                title: `${bot.config.bot.Emojis.error} | Stopped Song`,
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
}),
    (exports.config = {
        name: `Stop`,
        description: `Disconnects me from the voice channel and removes all songs in queue.`,
        aliases: [`disconnect`, `leave`],
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
