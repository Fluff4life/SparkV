const Discord = require("discord.js");

(exports.run = async (bot, message) => {
<<<<<<< HEAD
  message.reply(`${bot.config.bot.Emojis.success} | Here's my website! https://${process.env.BASEURL}/bot)`);
}),
  (exports.config = {
    name: "Website",
    description: "I'll send my website!",
    aliases: ["web"],
    usage: "",
    category: "🧰Utility🧰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5,
  });
=======
    message.reply(
        `${bot.config.bot.Emojis.success} | Here's my website! https://${process.env.BASEURL}/bot)`
    );
}),
    (exports.config = {
        name: "Website",
        description: "I'll send my website!",
        aliases: ["web"],
        usage: "",
        category: "🧰Utility🧰",
        bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
        member_permissions: [],
        enabled: true,
        cooldown: 1.5,
    });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
