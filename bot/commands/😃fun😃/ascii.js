const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
    if (bot.config.Debug.Enabled === true) {
        return;
    }

    const figlet = require(`figlet`);

    if (!args || !args[0]) {
        return message.reply(`Please provide text!`);
    }

    args = args.join(` `);

    figlet.text(args, (err, data) => {
        if (err) {
            message.reply(`Uh oh! Something went wrong.`);
            console.log(`Failed to figlet text: ${err}`);

            return;
        }

        if (data.length > 2000) {
            return message.reply(
                `Please provide text shorter than 200 characters.`
            );
        }

        message.replyNoMention(`\`\`\`${data}\`\`\``);
    });
};

exports.config = {
    name: `Ascii`,
    description: `I will change any text to ascii!`,
    aliases: [],
    usage: `<text>`,
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
};
