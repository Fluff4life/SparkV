const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments, Command) => {
  
},

exports.config = {
  enabled: false,
  guild_only: true,
  aliases: ["un"],
  mod_only: false
},
    
exports.help = {
  name: "Uno",
  description: "Play a game of Uno with me or mention someone to play with!",
  usage: "<user>",
  category: "🎲games🎲",
  cooldown: 60
}