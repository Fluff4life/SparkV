const Discord = require("discord.js");

const command = require("../../templates/gameCommand");

module.exports = new command(null, {
  description: "Ch1llBlox will look up any user and return information on that user.",
  usage: "<username>",
  aliases: [],
  perms: ["EMBED_LINKS"],
  gname: "poker",
  type: "together",
});
