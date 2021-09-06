const Discord = require("discord.js");

const cmd = require("../../templates/gameCommand");

module.exports = new cmd(null, {
  description: "Ch1llBlox will look up any user and return information on that user.",
  usage: "<username>",
  dirname: __dirname,
  aliases: [],
  perms: ["EMBED_LINKS"],
  gname: "betrayal",
  type: "together",
});
