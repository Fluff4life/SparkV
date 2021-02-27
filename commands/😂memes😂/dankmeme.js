const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, message) => {
  request("https://www.reddit.com/r/dankmemes/top/.json")
    .then(res => res.json())
    .then(json => {
      const post = json.data.children[Math.floor(Math.random() * json.data.children.length)].data

      if (post.title.length > 256) {
        const DankMemeEmbed = new Discord.MessageEmbed()
          .setTitle("Title too long")
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(`👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author}`, process.env.bot_logo)
          .setColor("#0099ff");

        message.channel.send(DankMemeEmbed)
      } else {
        const DankMemeEmbed = new Discord.MessageEmbed()
          .setTitle(post.title)
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(`👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author}`, process.env.bot_logo)
          .setColor("#0099ff");

        message.channel.send(DankMemeEmbed)
      }
    })
},

  exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["dank"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"]
  },

  exports.help = {
    name: "Meme",
    description: "Meme but SUPER dank. Only the funnyiest memes.",
    usage: "",
    category: "😂memes😂",
    cooldown: 2
  }
