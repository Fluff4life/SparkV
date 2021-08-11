const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (bot, message) => {
  request("https://www.reddit.com/r/me_irl/top/.json")
    .then(res => res.json())
    .then(json => {
      const post = json.data.children[Math.floor(Math.random() * json.data.children.length)].data;

      if (post.title.length > 256) {
        const MeIRLEmbed = new Discord.MessageEmbed()
          .setTitle("Title too long")
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(
            `👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} • ${bot.config.bot.Embed.Footer}`,
            bot.user.displayAvatarURL()
          )
          .setColor(bot.config.bot.Embed.Color);

        message.reply(MeIRLEmbed);
      } else {
        const MeIRLEmbed = new Discord.MessageEmbed()
          .setTitle(post.title)
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(
            `👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} • ${bot.config.bot.Embed.Footer}`,
            bot.user.displayAvatarURL()
          )
          .setColor(bot.config.bot.Embed.Color);

        message.reply(MeIRLEmbed);
      }
    });
};
  exports.config = {
    name: "me_irl",
    description: "me_irl memes lol.",
    aliases: ["meirlmeme", "meirl"],
    usage: "",
    category: "😃Fun😃",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"],
    member_permissions: [],
    enabled: true,
    cooldown: 3
};
