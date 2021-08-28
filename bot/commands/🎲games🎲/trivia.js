const Discord = require(`discord.js`);

(exports.run = async (bot, message, args, command, data) => {
    const { Trivia } = require("weky");

    if (args[0]) {
        if (
            !args[0] === "easy" ||
            !args[0] === "medium" ||
            !args[0] === "hard"
        ) {
            args[0] = "easy";
        }
    }

    await Trivia({
        message: message,
        embed: {
            title: "Trivia",
            description: "You only have **{{time}}** to guess the answer!",
            color: "#7289da",
            timestamp: true,
        },
        difficulty: args[0] || "easy",
        thinkMessage: "Hmmmmm",
        winMessage:
            "It was **{{answer}}**. You gave the correct answer in **{{time}}**.",
        loseMessage:
            "Better luck next time! The correct answer was **{{answer}}**.",
        emojis: {
            one: "1️⃣",
            two: "2️⃣",
            three: "3️⃣",
            four: "4️⃣",
        },
        othersMessage: "Only <@{{author}}> can use the buttons!",
        returnWinner: false,
    });
}),
    (exports.config = {
        name: `Trivia`,
        description: `Play a game of trivia!`,
        aliases: [`questions`],
        usage: ``,
        category: `🎲Games🎲`,
        bot_permissions: [
            `SEND_MESSAGES`,
            `READ_MESSAGE_HISTORY`,
            `EMBED_LINKS`,
            `VIEW_CHANNEL`,
        ],
        member_permissions: [],
        enabled: true,
        cooldown: 60,
    });
