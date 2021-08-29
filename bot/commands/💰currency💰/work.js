const Discord = require("discord.js");

exports.run = async (bot, message, args, command, data) => {
    message.reply(
        `${bot.config.bot.Emojis.error} | You don't have a job noob. You have to go get one to work lol.`
    );
};
exports.config = {
<<<<<<< HEAD
  name: "Work",
  description: "Work for your job and earn some Ch1llBucks.",
  aliases: ["job"],
  usage: "",
  category: "💰Currency💰",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 45,
=======
    name: "Work",
    description: "Work for your job and earn some Ch1llBucks.",
    aliases: ["job"],
    usage: "",
    category: "💰Currency💰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 45,
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
};
