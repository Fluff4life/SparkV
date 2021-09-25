const Discord = require("discord.js");

const cmd = require("../../templates/gameCommand");

module.exports = new cmd(null, {
  description: "Play a game of chess! Requires two people in a VC.",
  dirname: __dirname,
  usage: "<username>",
  aliases: [],
  perms: ["EMBED_LINKS"],
  gname: "chess",
  type: "together",
});
