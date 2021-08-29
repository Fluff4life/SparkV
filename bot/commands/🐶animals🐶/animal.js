const Discord = require("discord.js");
const request = require("node-fetch");

const SubReddits = ["cats", "dogs", "ducc", "foxes"];

(exports.run = async (bot, message) => {
<<<<<<< HEAD
  const Subreddit = SubReddits[Math.floor(Math.random() * SubReddits.length)];
=======
    const Subreddit = SubReddits[Math.floor(Math.random() * SubReddits.length)];
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

    request(`https://www.reddit.com/r/${Subreddit}/top/.json`)
        .then(res => res.json())
        .then(async json => {
            const post =
                json.data.children[
                    Math.floor(Math.random() * json.data.children.length)
                ].data;

<<<<<<< HEAD
      if (post.title.length > 256) {
        const AnimalEmbed = new Discord.MessageEmbed()
          .setTitle("Title too long")
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(
            `👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} | ⚙r/${Subreddit} • ${bot.config.bot.Embed.Footer}`,
            bot.user.displayAvatarURL(),
          )
          .setColor(bot.config.bot.Embed.Color);

        message.reply(AnimalEmbed);
      } else {
        const AnimalEmbed = new Discord.MessageEmbed()
          .setTitle(post.title)
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(
            `👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} | ⚙r/${Subreddit} • ${bot.config.bot.Embed.Footer}`,
            bot.user.displayAvatarURL(),
          )
          .setColor(bot.config.bot.Embed.Color);
=======
            if (post.title.length > 256) {
                const AnimalEmbed = new Discord.MessageEmbed()
                    .setTitle("Title too long")
                    .setImage(post.url)
                    .setURL(`https://www.reddit.com${post.permalink}`)
                    .setFooter(
                        `👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} | ⚙r/${Subreddit} • ${bot.config.bot.Embed.Footer}`,
                        bot.user.displayAvatarURL()
                    )
                    .setColor(bot.config.bot.Embed.Color);

                message.reply(AnimalEmbed);
            } else {
                const AnimalEmbed = new Discord.MessageEmbed()
                    .setTitle(post.title)
                    .setImage(post.url)
                    .setURL(`https://www.reddit.com${post.permalink}`)
                    .setFooter(
                        `👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} | ⚙r/${Subreddit} • ${bot.config.bot.Embed.Footer}`,
                        bot.user.displayAvatarURL()
                    )
                    .setColor(bot.config.bot.Embed.Color);
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

                const AnimalMessage = await message.reply(AnimalEmbed);
                AnimalMessage.react("😍");
            }
        });
}),
    (exports.config = {
        name: "Animal",
        description: "I will send a animal pic from multible subreddits.",
        aliases: ["cuteanimal"],
        usage: "",
        category: "🐶Animals🐶",
        bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
        member_permissions: [],
        enabled: true,
        cooldown: 3,
    });
<<<<<<< HEAD
}),
  (exports.config = {
    name: "Animal",
    description: "I will send a animal pic from multible subreddits.",
    aliases: ["cuteanimal"],
    usage: "",
    category: "🐶Animals🐶",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 3,
  });
=======
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
