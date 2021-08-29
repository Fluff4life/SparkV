const Discord = require("discord.js");

const showerthoughts = ["showerthoughts"];

exports.run = async (bot, message) => {
    const random_showerthought =
        showerthoughts[Math.floor(Math.random() * showerthoughts.length)];

<<<<<<< HEAD
  const ShowerThoughtEmbed = new Discord.MessageEmbed()
    .setTitle("Here's a shower thought")
    .setFooter(
      `Shower Thought from r/${random_showerthought} • ${bot.config.bot.Embed.Footer}`,
      bot.user.displayAvatarURL(),
    )
    .setURL(`https://reddit.com/r/${random_showerthought}`)
    .setColor(bot.config.bot.Embed.Color)
    .setTimestamp();
=======
    const ShowerThoughtEmbed = new Discord.MessageEmbed()
        .setTitle("Here's a shower thought")
        .setFooter(
            `Shower Thought from r/${random_showerthought} • ${bot.config.bot.Embed.Footer}`,
            bot.user.displayAvatarURL()
        )
        .setURL(`https://reddit.com/r/${random_showerthought}`)
        .setColor(bot.config.bot.Embed.Color)
        .setTimestamp();
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

    await message.reply(ShowerThoughtEmbed);
};

exports.config = {
<<<<<<< HEAD
  name: "ShowerThought",
  description: "I will say whatever you want me to say.",
  aliases: ["thought"],
  usage: "",
  category: "😃Fun😃",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES"],
  member_permissions: [],
  enabled: true,
  cooldown: 5,
=======
    name: "ShowerThought",
    description: "I will say whatever you want me to say.",
    aliases: ["thought"],
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
    cooldown: 5,
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
};
