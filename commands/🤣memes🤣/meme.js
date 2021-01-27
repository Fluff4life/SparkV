const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, message) => {
  request("https://meme-api.herokuapp.com/gimme")
    .then(res => res.json())
    .then(async json => {
      if (json.nsfw == false) {
        const RedditEmbend = new Discord.MessageEmbed()
          .setTitle(json.title)
          .setDescription(`*Meme from r/${json.subreddit}*`)
          .setImage(json.url)
          .setURL(json.postLink)
          .setFooter(`👍${json.ups} | 😃u/${json.author}`, process.env.bot_logo)
          .setColor("#0099ff");
        
        console.log(RedditEmbend)

        const MemeMessage = await message.channel.send(RedditEmbend);

    MemeMessage.react("😂");
    MemeMessage.react("👍");
    MemeMessage.react("👎");
    MemeMessage.react("😬");
      }
    });
},
  
  exports.config = {
    enabled: true,
    guild_only: false,
    mod_only: false,
    aliases: ["emem", "memey", "m"]
  },
    
  exports.help = {
    name: "Meme",
    description:
      "I will send a popular meme trending on a choice of many different subreddits.",
    usage: "",
    category: "🤣memes🤣",
    cooldown: 2
  }