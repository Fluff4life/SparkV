const Discord = require(`discord.js`);

(exports.run = async (bot, message, args, command, data) => {
    const queue = bot.distube.getQueue(message);

    if (!queue) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | The queue is empty! Try adding some songs.`
        );
    }

    message.reply({
        embed: {
            title: `${bot.config.bot.Emojis.music} | Queue for ${message.guild.name}`,
            description: queue.songs
                .map(
                    (song, id) =>
                        `**${id + 1}**. ${song.name} - ${
                            song.formattedDuration
                        }`
                )
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
}),
    (exports.config = {
        name: `Queue`,
        description: `Shows the songs in queue.`,
        aliases: [`que`],
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
