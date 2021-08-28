const TicTacToe = require("discord-tictactoe");
const Discord = require("discord.js");

(exports.run = async (bot, message, args, command, data) => {
    const Game = new TicTacToe({ language: "en" }, bot);

    Game.handleMessage(message);
}),
    (exports.config = {
        name: "TicTacToe",
        description:
            "Play a game of Tic Tac Toe with me or mention someone to play with!",
        aliases: ["ttt"],
        usage: "<optional user>",
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
