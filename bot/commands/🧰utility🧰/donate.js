const Discord = require(`discord.js`);

(exports.run = async (bot, message) => {
<<<<<<< HEAD
  message.reply(
    `${bot.config.bot.Emojis.success} | Did you know that Ch1llBlox took 7 months to develope? It's true! KingCh1ll wanted everything perfect for its release. If you want to support Ch1llBlox's developement, go to **https://${process.env.BASEURL}/bot/donate**. Thank you!`,
  );
}),
  (exports.config = {
    name: `Donate`,
    description: `Donate in the form of robux to help Ch1llBlox's developement. Every donation is really appreciated!`,
    aliases: [],
    usage: ``,
    category: `🧰Utility🧰`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5,
  });
=======
    message.reply(
        `${bot.config.bot.Emojis.success} | Did you know that Ch1llBlox took 7 months to develope? It's true! KingCh1ll wanted everything perfect for its release. If you want to support Ch1llBlox's developement, go to **https://${process.env.BASEURL}/bot/donate**. Thank you!`
    );
}),
    (exports.config = {
        name: `Donate`,
        description: `Donate in the form of robux to help Ch1llBlox's developement. Every donation is really appreciated!`,
        aliases: [],
        usage: ``,
        category: `🧰Utility🧰`,
        bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
        member_permissions: [],
        enabled: true,
        cooldown: 1.5,
    });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
