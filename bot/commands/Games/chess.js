const Discord = require("discord.js");

const cmd = require("../../templates/gameCommand");

module.exports = new cmd(null, {
  description: "SparkV will look up any user and return information on that user.",
  dirname: __dirname,
  usage: "<username>",
  aliases: [],
  perms: ["EMBED_LINKS"],
  gname: "chess",
  type: "together",
});
