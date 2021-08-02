const Discord = require('discord.js');
const request = require('node-fetch');

const SubReddits = [
  'PewdiepieSubmissions',
  'ComedyCemetery',
  'AdviceAnimals',
  'PrequelMemes',
  'MemeEconomy',
  'DankMemes',
  'me_irl',
  'Memes',
  'Funny',
];

exports.run = async (bot, message) => {
  const Subreddit = SubReddits[Math.floor(Math.random() * SubReddits.length)];

  request(`https://www.reddit.com/r/${Subreddit}/top/.json`)
    .then(res => res.json())
    .then(async json => {
      const post = json.data.children[Math.floor(Math.random() * json.data.children.length)].data;

      if (post.title.length > 256) {
        const DankMemeEmbed = new Discord.MessageEmbed()
          .setTitle('Title too long')
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(
            `👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} | ⚙r/${Subreddit} • ${bot.config.bot.Embed.Footer}`,
            bot.user.displayAvatarURL()
          )
          .setColor(bot.config.bot.Embed.Color);

        message.reply(DankMemeEmbed);
      } else {
        const DankMemeEmbed = new Discord.MessageEmbed()
          .setTitle(post.title)
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(
            `👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} | ⚙r/${Subreddit} • ${bot.config.bot.Embed.Footer}`,
            bot.user.displayAvatarURL()
          )
          .setColor(bot.config.bot.Embed.Color);

        message.reply(DankMemeEmbed);
      }
    });
};
  exports.config = {
    name: 'Meme',
    description: 'LOL',
    aliases: ['memey'],
    usage: '',
    category: '😂memes😂',
    bot_permissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'VIEW_CHANNEL', 'ADD_REACTIONS'],
    member_permissions: [],
    enabled: true,
    cooldown: 3
};
