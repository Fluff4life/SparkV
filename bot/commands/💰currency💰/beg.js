const Discord = require("discord.js");

exports.run = async (bot, message, args, command, data) => {
    var Ch1llBucks = data.user.money.balance;
    var Multiplier = data.user.money.multiplier;
    const RandomAmmount = Math.floor(Math.random() * 500) + 1;

    if (!Ch1llBucks) {
        Ch1llBucks = 0;
    }

    if (!Multiplier) {
        Multiplier = 1;
    }

    const Ammount = RandomAmmount * Multiplier;

    Ch1llBucks += Ammount;

    message.reply(
        `${
            bot.config.bot.Emojis.success
        } | You begged and recieved ${await bot.FormatNumber(
            Ammount
        )} Ch1llBucks!`
    );
};
exports.config = {
  name: "Balance",
  description: "Beg for coins.",
  aliases: ["ask"],
  usage: "<optional user>",
  category: "💰Currency💰",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 15,
};
