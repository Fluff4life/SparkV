const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

module.exports = new cmd(
  (bot, message) => {
    message.reply(
      `${bot.config.bot.Emojis.success} | Did you know that Ch1llBlox took 7 months to develope? It's true! KingCh1ll wanted everything perfect for its release. If you want to support Ch1llBlox's developement, go to **https://${process.env.BASEURL}/bot/donate**. Thank you!`,
    );
  },
  {
    description: `Donate in the form of robux to help Ch1llBlox's developement. Every donation is really appreciated!`,
    usage: "",
    aliases: [],
    perms: ["EMBED_LINKS"],
  },
);
