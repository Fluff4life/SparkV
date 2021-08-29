const Discord = require("discord.js");
const request = require("node-fetch");

(exports.run = async (bot, message) => {
    request("https://www.reddit.com/r/ComedyCemetery/top/.json")
        .then(res => res.json())
        .then(json => {
            const post =
                json.data.children[
                    Math.floor(Math.random() * json.data.children.length)
                ].data;

            if (post.title.length > 256) {
                const ComedyCemeteryEmbed = new Discord.MessageEmbed()
                    .setTitle("Title too long")
                    .setImage(post.url)
                    .setURL(`https://www.reddit.com${post.permalink}`)
                    .setFooter(
                        `👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} • ${bot.config.bot.Embed.Footer}`,
                        bot.user.displayAvatarURL()
                    )
                    .setColor(bot.config.bot.Embed.Color);

                message.reply(ComedyCemeteryEmbed);
            } else {
                const ComedyCemeteryEmbed = new Discord.MessageEmbed()
                    .setTitle(post.title)
                    .setImage(post.url)
                    .setURL(`https://www.reddit.com${post.permalink}`)
                    .setFooter(
                        `👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} • ${bot.config.bot.Embed.Footer}`,
                        bot.user.displayAvatarURL()
                    )
                    .setColor(bot.config.bot.Embed.Color);

                message.reply(ComedyCemeteryEmbed);
            }
        });
}),
    (exports.config = {
        name: "Comedy",
        description: "The place for comedy memes from r/ComedyCemetery!",
        aliases: ["comedymeme"],
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
