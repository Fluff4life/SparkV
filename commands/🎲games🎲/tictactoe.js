const Discord = require("discord.js");
const TicTacToe = require("discord-tictactoe");

exports.run = async (Bot, msg, Arguments, Command) => {
  var Prefix = Bot.Database.get(`ServerData_${message.guild.id}.prefix`)

  if (!Prefix){
    Prefix = process.env.prefix
  }

  new TicTacToe({
    language: "en",
    command: `${prefix}TicTacToe`
  }, Bot)
},

exports.config = {
  name: "TicTacToe",
  description: "Play a game of Tic Tac Toe with me or mention someone to play with!",
  aliases: ["TicTacToe"],
  usage: "<optional user>",
  category: "🎲games🎲",
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 60
}