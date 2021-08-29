const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (bot, message) => {
    request("https://www.reddit.com/r/MemeEconomy/top/.json")
        .then(res => res.json())
        .then(json => {
            const post =
                json.data.children[
                    Math.floor(Math.random() * json.data.children.length)
                ].data;

<<<<<<< HEAD
      if (post.title.length > 256) {
        const MemeEconomyEmbed = new Discord.MessageEmbed()
          .setTitle("Title too long")
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(
            `👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} • ${bot.config.bot.Embed.Footer}`,
            bot.user.displayAvatarURL(),
          )
          .setColor(bot.config.bot.Embed.Color);

        message.reply(MemeEconomyEmbed);
      } else {
        const MemeEconomyEmbed = new Discord.MessageEmbed()
          .setTitle(post.title)
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(
            `👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} • ${bot.config.bot.Embed.Footer}`,
            bot.user.displayAvatarURL(),
          )
          .setColor(bot.config.bot.Embed.Color);
=======
            if (post.title.length > 256) {
                const MemeEconomyEmbed = new Discord.MessageEmbed()
                    .setTitle("Title too long")
                    .setImage(post.url)
                    .setURL(`https://www.reddit.com${post.permalink}`)
                    .setFooter(
                        `👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} • ${bot.config.bot.Embed.Footer}`,
                        bot.user.displayAvatarURL()
                    )
                    .setColor(bot.config.bot.Embed.Color);

                message.reply(MemeEconomyEmbed);
            } else {
                const MemeEconomyEmbed = new Discord.MessageEmbed()
                    .setTitle(post.title)
                    .setImage(post.url)
                    .setURL(`https://www.reddit.com${post.permalink}`)
                    .setFooter(
                        `👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} • ${bot.config.bot.Embed.Footer}`,
                        bot.user.displayAvatarURL()
                    )
                    .setColor(bot.config.bot.Embed.Color);
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

                message.reply(MemeEconomyEmbed);
            }
        });
};
exports.config = {
<<<<<<< HEAD
  name: "Economy",
  description: "lol",
  aliases: ["memeeconomy"],
  usage: "",
  category: "😃Fun😃",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"],
  member_permissions: [],
  enabled: true,
  cooldown: 3,
=======
    name: "Economy",
    description: "lol",
    aliases: ["memeeconomy"],
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
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
};
