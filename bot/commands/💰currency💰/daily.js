const Discord = require("discord.js");

exports.run = async (bot, message, args, command, data) => {
    const RandomAmmount = Math.floor(Math.random() * 3500) + 1;

    var Ch1llBucks = data.user.money.balance;
    var Multiplier = data.user.money.multiplier;

    const Ammount = RandomAmmount * Multiplier;

    data.user.money.balance = Ch1llBucks + Ammount;
    await data.user.save();

    message.reply(
        `${
            bot.config.bot.Emojis.success
        } | You've just earned ❄${await bot.FormatNumber(Ammount)} Ch1llBucks!`
    );
};
exports.config = {
    name: "Daily",
    description: "Collect your daily ammount of Ch1llBucks!",
    aliases: [],
    usage: "",
    category: "💰Currency💰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 86400,
};
