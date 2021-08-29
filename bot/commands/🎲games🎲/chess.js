const Discord = require(`discord.js`);
const Weather = require(`weather-js`);

(exports.run = async (bot, message, args, command, data) => {
    if (!message.member.voice.channel) {
        return message.reply("Please join a __voice channel__!");
    }

    bot.discordTogether
        .createTogetherCode(message.member.voice.channel.id, "chess")
        .then(async invite => message.reply(`${invite.code}`));
}),
    (exports.config = {
        name: `Chess`,
        description: `e`,
        aliases: [],
        usage: ``,
        category: `🎲Games🎲`,
        bot_permissions: [
            `SEND_MESSAGES`,
            `EMBED_LINKS`,
            `VIEW_CHANNEL`,
            `ADD_REACTIONS`,
        ],
        member_permissions: [],
        enabled: true,
        cooldown: 5,
    });
