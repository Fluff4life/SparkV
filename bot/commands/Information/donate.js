const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

module.exports = new cmd(
  (bot, message) => {
    message.reply(
      `${bot.config.bot.Emojis.success} | Did you know that SparkV took 7 months to develope? It's true! KingCh1ll wanted everything perfect for its release. If you want to support SparkV's developement, go to **https://${process.env.BASEURL}/bot/donate**. Thank you!`,
    );
  },
  {
    description: `Donate in the form of robux to help SparkV's developement. Every donation is really appreciated!`,
    dirname: __dirname,
    usage: "",
    aliases: [],
    perms: ["EMBED_LINKS"],
  },
);
