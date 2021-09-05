const cmd = require("../../templates/gameCommand");

module.exports = new cmd(null, {
  description: "YouTube together!",
  usage: "",
  aliases: ["startyt"],
  perms: ["EMBED_LINKS"],
  gname: "youtube",
  type: "together",
});
