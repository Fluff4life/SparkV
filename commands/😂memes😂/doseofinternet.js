const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, message) => {
  request("https://www.reddit.com/top/.json")
    .then(res => res.json())
    .then(json => {
      const post = json.data.children[Math.floor(Math.random() * json.data.children.length)].data

      if (post.title.length > 256){
        const DOIEmbed = new Discord.MessageEmbed()
        .setTitle("Title too long")
        .setImage(post.url)
        .setURL(`https://www.reddit.com${post.permalink}`)
        .setFooter(`👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} | ⚙r/${post.subreddit}`, Bot.user.AvatarURL)
        .setColor(Bot.Config.Embed.EmbedColor);

        
        message.channel.send(DOIEmbed)
      } else {
        const DOIEmbed = new Discord.MessageEmbed()
        .setTitle(post.title)
        .setImage(post.url)
        .setURL(`https://www.reddit.com${post.permalink}`)
        .setFooter(`👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} | ⚙r/${post.subreddit}`, Bot.user.AvatarURL)
        .setColor(Bot.Config.Embed.EmbedColor);

        message.channel.send(DOIEmbed)
      }
    })
},

  exports.config = {
    name: "DoseOfInternet",
    description: "I'll send a dose of the internet.",
    aliases: ["doi", "di", "doseinternet"],
    usage: "",
    category: "😂memes😂",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"],
    member_permissions: [],
    enabled: true,
    cooldown: 3
  }