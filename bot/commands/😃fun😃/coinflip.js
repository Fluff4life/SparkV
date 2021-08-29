const Discord = require("discord.js");

const Replies = ["Heads", "Tails"];

exports.run = async (bot, message, args, command, data) => {
    const ReplyText = Math.floor(Math.random() * Replies.length);

    return message.reply(`My coin flipped ${Replies[ReplyText]}!`);
};

exports.config = {
<<<<<<< HEAD
  name: "CoinFlip",
  description: "I have no bias! I swear noob!1!",
  aliases: ["CF"],
  usage: "",
  category: "😃Fun😃",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES"],
  member_permissions: [],
  enabled: true,
  cooldown: 3,
=======
    name: "CoinFlip",
    description: "I have no bias! I swear noob!1!",
    aliases: ["CF"],
    usage: "",
    category: "😃Fun😃",
    bot_permissions: [
        "SEND_MESSAGES",
        "EMBED_LINKS",
        "VIEW_CHANNEL",
        "MANAGE_MESSAGES",
    ],
    member_permissions: [],
    enabled: true,
    cooldown: 3,
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
};
