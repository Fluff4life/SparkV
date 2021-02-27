const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, message) => {
  request("https://www.reddit.com/r/AdviceAnimals/top/.json")
    .then(res => res.json())
    .then(json => {
      const post = json.data.children[Math.floor(Math.random() * json.data.children.length)].data

      if (post.title.length > 256) {
        const AdviceAnimalsEmbed = new Discord.MessageEmbed()
          .setTitle("Title too long")
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(`👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author}`, process.env.bot_logo)
          .setColor("#0099ff");

        message.channel.send(AdviceAnimalsEmbed)
      } else {
        const AdviceAnimalsEmbed = new Discord.MessageEmbed()
          .setTitle(post.title)
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(`👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author}`, process.env.bot_logo)
          .setColor("#0099ff");

        message.channel.send(AdviceAnimalsEmbed)
      }
    })
},

  exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["animaladvice"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"]
  },

  exports.help = {
    name: "AnimalsAdvice",
    description: "Take an advice from an animal!",
    usage: "",
    category: "😂memes😂",
    cooldown: 2
  }
