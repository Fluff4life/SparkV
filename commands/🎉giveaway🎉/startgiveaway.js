const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, msg, Arguments) => {
  
},

exports.config = {
  name: "StartGiveaway",
  description: "Starts a giveaway. Requires the permision MANAGE_MESSAGES.",
  aliases: ["startg"],
  usage: "",
  category: "",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: ["MANAGE_MESSAGES"],
  enabled: true,
  cooldown: 10
}