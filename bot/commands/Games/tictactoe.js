const TicTacToe = require("discord-tictactoe");
const Discord = require("discord.js");

const command = require("../../templates/gameCommand");

async function execute(bot, message, args, command, data) {
  const Game = new TicTacToe({ language: "en" }, bot);

  Game.handleMessage(message);
}

module.exports = new command(execute, {
  description: "Play a game of Tic Tac Toe with me or mention someone to play with!",
  usage: "",
  aliases: ["ttt"],
  perms: ["EMBED_LINKS"],
  type: "game",
});
