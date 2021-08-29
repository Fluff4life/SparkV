const Discord = require("discord.js");
const request = require("node-fetch");

(exports.run = async (bot, message) => {
<<<<<<< HEAD
  request("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(res => res.json())
    .then(json => {
      const FunFactEmbed = new Discord.MessageEmbed()
        .setTitle(`${bot.config.bot.Emojis.success} | Did you know?`)
        .setDescription(json.text)
        .setFooter(`Fun facts powered by https://uselessfacts.jsph.pl! • ${bot.config.bot.Embed.Footer}`)
        .setColor(bot.config.bot.Embed.Color)
        .setTimestamp();
=======
    request("https://uselessfacts.jsph.pl/random.json?language=en")
        .then(res => res.json())
        .then(json => {
            const FunFactEmbed = new Discord.MessageEmbed()
                .setTitle(`${bot.config.bot.Emojis.success} | Did you know?`)
                .setDescription(json.text)
                .setFooter(
                    `Fun facts powered by https://uselessfacts.jsph.pl! • ${bot.config.bot.Embed.Footer}`
                )
                .setColor(bot.config.bot.Embed.Color)
                .setTimestamp();
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

            const Message = message.reply(FunFactEmbed);

            Message.react("🤯");
            Message.react("😬");
        });
}),
    (exports.config = {
        name: "UselessFact",
        description:
            "I will get a useless fact! You're better off with the advice command...",
        aliases: ["uf"],
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
        cooldown: 3,
    });
<<<<<<< HEAD
}),
  (exports.config = {
    name: "UselessFact",
    description: "I will get a useless fact! You're better off with the advice command...",
    aliases: ["uf"],
    usage: "",
    category: "😃Fun😃",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"],
    member_permissions: [],
    enabled: true,
    cooldown: 3,
  });
=======
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
