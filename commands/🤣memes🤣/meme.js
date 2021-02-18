const Discord = require("discord.js");
const request = require("node-fetch");

const SubReddits = [
  "PewdiepieSubmissions",
  "ComedyCemetery",
  "AdviceAnimals",
  "PrequelMemes",
  "MemeEconomy",
  "DankMemes",
  "Memes",
  "Funny",
]

exports.run = async (Bot, message) => {
  /* request("https://meme-api.herokuapp.com/gimme")
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
        
        const MemeMessage = await message.channel.send(RedditEmbend);
      }
    }); */
  
  async function Get(Subreddit){
    request(`https://www.reddit.com/r/${Subreddit}/random/.json`)
      .then(res => res.json())
      .then(async ResponseData => {
        const [ list ] = JSON.parse(ResponseData.body);
        const [ post ] = list.data.children;
      
    if ((post.data.ups) <= 15000){
      Get(Subreddit, ResponseData)
    } else {
      const MemeMessage = await message.channel.send({
        embed: {
          title: post.data.title,
          description: post.data.description,
          color: "#0099ff",
          
          url: `https://reddit.com${post.data.permalink}`,
          
          image: {
            url: post.data.url,
          },
          
          footer: {
            text: `👍${post.data.ups} | 💬${post.data.num_comments} | 😃u/${post.data.author} | r/${Subreddit}`,
            icon_url: process.env.bot_logo
           },
         }
       })
        
      return MemeMessage
      }
    })
  }
  
  const RandomSubreddit = SubReddits[Math.floor(Math.random() * SubReddits.length)]
  await Get(RandomSubreddit)

  message.channel.startTyping()
  message.channel.send(`Getting popular meme from r/${RandomSubreddit}.`)
  
  message.channel.stopTyping()
},
  
exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["emem", "memey", "m"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"]
  },
    
exports.help = {
    name: "Meme",
    description: "I will send a popular meme trending on a choice of many different subreddits.",
    usage: "",
    category: "🤣memes🤣",
    cooldown: 2
  }
