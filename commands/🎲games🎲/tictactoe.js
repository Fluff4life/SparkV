const Discord = require("discord.js");
const TicTacToe = require("discord-tictactoe");

exports.run = async (Bot, message, Arguments) => {
  const Game = new TicTacToe({
    language: "en"
  }, Bot)

  Game.handleMessage(message)
},

exports.config = {
  name: "TicTacToe",
  description: "Play a game of Tic Tac Toe with me or mention someone to play with!",
  aliases: ["ttt"],
  usage: "<optional user>",
  category: "🎲games🎲",
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 60
}