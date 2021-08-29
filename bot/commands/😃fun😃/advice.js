const Discord = require("discord.js");
const request = require("node-fetch");

(exports.run = async (bot, message) => {
<<<<<<< HEAD
  request("https://api.adviceslip.com/advice")
    .then(res => res.json())
    .then(async json => {
      const AdviceEmbed = new Discord.MessageEmbed()
        .setTitle("Here's an advice")
        .setDescription(json.slip.advice)
        .setFooter(`You got advice #${json.slip.id} • ${bot.config.bot.Embed.Footer}`, bot.user.displayAvatarURL())
        .setColor(bot.config.bot.Embed.Color)
        .setTimestamp();
=======
    request("https://api.adviceslip.com/advice")
        .then(res => res.json())
        .then(async json => {
            const AdviceEmbed = new Discord.MessageEmbed()
                .setTitle("Here's an advice")
                .setDescription(json.slip.advice)
                .setFooter(
                    `You got advice #${json.slip.id} • ${bot.config.bot.Embed.Footer}`,
                    bot.user.displayAvatarURL()
                )
                .setColor(bot.config.bot.Embed.Color)
                .setTimestamp();
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

            const Message = await message.reply(AdviceEmbed);

            Message.react("👍");
            Message.react("👎");
        });
}),
    (exports.config = {
        name: "Advice",
        description: "You'll need it.",
        aliases: [],
        usage: "",
        category: "😃Fun😃",
        bot_permissions: [
            "SEND_MESSAGES",
            "EMBED_LINKS",
            "VIEW_CHANNEL",
            "ADD_REACTIONS",
        ],
        member_permissions: [],
        enabled: true,
        cooldown: 5,
    });
<<<<<<< HEAD
}),
  (exports.config = {
    name: "Advice",
    description: "You'll need it.",
    aliases: [],
    usage: "",
    category: "😃Fun😃",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"],
    member_permissions: [],
    enabled: true,
    cooldown: 5,
  });
=======
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
