const Discord = require(`discord.js`);

const cmd = require("../../templates/configCommand");

module.exports = new cmd({
  description: `Changes the prefix.`,
  dirname: __dirname,
  usage: "",
  aliases: [],
  perms: ["MANAGE_MESSAGES"],
  settingName: "prefix",
  responces: {
    invalid_args: "You need to provide a **prefix**.",
    invalid_args_length: "You need to provide a prefix **UNDER** `5` characters."
  }
});
