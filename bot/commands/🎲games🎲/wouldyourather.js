const Discord = require("discord.js");

(exports.run = async (bot, message, args, command, data) => {
    const { WouldYouRather } = require("weky");

    await WouldYouRather({
        message: message,
        embed: {
            title: "Would you rather...",
            color: "#7289da",
            timestamp: true,
        },
        thinkMessage: "Hmmmmmm",
        othersMessage: "Only <@{{author}}> can use the buttons!",
        buttons: { optionA: "Option A", optionB: "Option B" },
    });
}),
    (exports.config = {
        name: "WouldYouRather",
        description: "Play a game of Rock Paper Scissors with me!",
        aliases: ["wyr"],
        usage: "",
        category: "🎲Games🎲",
        bot_permissions: [
            "SEND_MESSAGES",
            "READ_MESSAGE_HISTORY",
            "EMBED_LINKS",
            "VIEW_CHANNEL",
        ],
        member_permissions: [],
        enabled: true,
        cooldown: 60,
    });
