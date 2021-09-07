const Discord = require("discord.js");

module.exports = {
  once: false,
  execute(bot, event) {
    LogError("Fatal", event);

    console.log(`ERROR! => ${event}`);
  },
};
