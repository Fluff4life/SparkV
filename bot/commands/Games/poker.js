const Discord = require("discord.js");

const cmd = require("../../templates/gameCommand");

module.exports = new cmd(null, {
  description: "SparkV will look up any user and return information on that user.",
  usage: "<username>",
  aliases: [],
  perms: ["EMBED_LINKS"],
  gname: "poker",
  type: "together",
});
