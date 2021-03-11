const Discord = require("discord.js");
const request = require("node-fetch");

const SubReddits = [
  "cats",
  "dogs",
  "ducc",
  "foxes"
]

exports.run = async (Bot, message) => {
  const Subreddit = SubReddits[Math.floor(Math.random() * SubReddits.length)]

  request(`https://www.reddit.com/r/${Subreddit}/top/.json`)
    .then(res => res.json())
    .then(async json => {
      const post = json.data.children[Math.floor(Math.random() * json.data.children.length)].data

      if (post.title.length > 256) {
        const AnimalEmbed = new Discord.MessageEmbed()
          .setTitle("Title too long")
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(`👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} | ⚙r/${Subreddit}`, Bot.user.AvatarURL)
          .setColor("#0099ff");

        message.channel.send(AnimalEmbed)
      } else {
        const AnimalEmbed = new Discord.MessageEmbed()
          .setTitle(post.title)
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(`👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} | ⚙r/${Subreddit}`, Bot.user.AvatarURL)
          .setColor("#0099ff");

        const AnimalMessage = await message.channel.send(AnimalEmbed)
        AnimalMessage.react("😍");
      }
    })
},

exports.config = {
  name: "Animal",
  description: "I will send a animal pic from multible subreddits.",
  aliases: ["cuteanimal"],
  usage: "",
  category: "🐶animals🐶",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 3
}