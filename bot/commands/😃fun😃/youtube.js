const Discord = require(`discord.js`);
const Weather = require(`weather-js`);

(exports.run = async (bot, message, args, command, data) => {
<<<<<<< HEAD
  if (!message.member.voice.channel) {
    return message.reply("Please join a __voice channel__!");
  }

  bot.discordTogether
    .createTogetherCode(message.member.voice.channel.id, "youtube")
    .then(async invite => message.reply(`${invite.code}`));
}),
  (exports.config = {
    name: `YouTube`,
    description: `e`,
    aliases: ["startyt", "syt"],
    usage: ``,
    category: `😃Fun😃`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `ADD_REACTIONS`],
    member_permissions: [],
    enabled: true,
    cooldown: 5,
  });
=======
    if (!message.member.voice.channel) {
        return message.reply("Please join a __voice channel__!");
    }

    bot.discordTogether
        .createTogetherCode(message.member.voice.channel.id, "youtube")
        .then(async invite => message.reply(`${invite.code}`));
}),
    (exports.config = {
        name: `YouTube`,
        description: `e`,
        aliases: ["startyt", "syt"],
        usage: ``,
        category: `😃Fun😃`,
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
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
