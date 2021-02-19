const Discord = require("discord.js");
const TikTacToe = require("discord-tictactoe");

exports.run = async (Bot, msg, Arguments, Command) => {
  new TikTacToe({
    language: "en",
    command: `${process.env.prefix}TicTacToe`
  }, Bot)
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["TicTacToe"],
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL"]
  
},
    
exports.help = {
  name: "TicTacToe",
  description: "Play a game of Tic Tac Toe with me or mention someone to play with!",
  usage: "<optional user>",
  category: "🎲games🎲",
  cooldown: 60
}
