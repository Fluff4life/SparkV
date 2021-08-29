const Discord = require("discord.js");
const fetch = require("node-fetch");

const NewCommand = require("./command");

const filters = {
  image: post => post.data.post_hint === "image",
  text: post => post.data.post_hint !== "image" && post.data.selftext.length <= 2000 && post.data.title.length <= 256,
};

module.exports = class RedditCommand {
  constructor(sett) {
    this.settings = new NewCommand(
      null,
      Object.assign(
        {
          cooldown: 3 * 1000,
          slash: true,
          perms: ["EMBED_LINKS"],
        },
        sett,
      ),
    ).settings;
  }

  async run(bot, message, args, command) {
    const body = await fetch(`https://www.reddit.com${this.settings.endpoint}`).then(response => response.json());

    const posts = body.data.children.filter(filters[this.settings.type]);
    const selectedPost = posts[Math.floor(Math.random() * Object.keys(posts).length)].data;

    const RedditEmbed = new Discord.MessageEmbed()
      .setTitle(selectedPost.title.length > 256 ? `${selectedPost.title.slice(0, 248)}...` : selectedPost.title)
      .setImage(this.settings.type === "image" ? selectedPost.url : "")
      .setURL(`https://www.reddit.com${selectedPost.permalink}`)
      .setFooter(
        `👍${selectedPost.ups} | 💬${selectedPost.num_comments} | 😃u/${selectedPost.author} | ⚙️r/${selectedPost.subreddit} • ${bot.config.bot.Embed.Footer}`,
        bot.user.displayAvatarURL(),
      )
      .setColor(bot.config.bot.Embed.Color);

    if (this.settings.type === "text") {
      RedditEmbed.setDescription(selectedPost.selftext);
    }

    message.reply({
      embeds: [RedditEmbed],
    });
  }
};
