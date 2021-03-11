const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, message) => {
  request("https://www.reddit.com/r/MemeEconomy/top/.json")
    .then(res => res.json())
    .then(json => {
      const post = json.data.children[Math.floor(Math.random() * json.data.children.length)].data

      if (post.title.length > 256) {
        const MemeEconomyEmbed = new Discord.MessageEmbed()
          .setTitle("Title too long")
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(`👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author}`, Bot.user.AvatarURL)
          .setColor(process.env.EmbedColor);

        message.channel.send(MemeEconomyEmbed)
      } else {
        const MemeEconomyEmbed = new Discord.MessageEmbed()
          .setTitle(post.title)
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(`👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author}`, Bot.user.AvatarURL)
          .setColor(process.env.EmbedColor);

        message.channel.send(MemeEconomyEmbed)
      }
    })
},

  exports.config = {
    name: "Economy",
    description: "lol",
    aliases: ["memeeconomy"],
    usage: "",
    category: "😂memes😂",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"],
    member_permissions: [],
    enabled: true,
    cooldown: 3
  }