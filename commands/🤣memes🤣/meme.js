const Discord = require("discord.js");
const got = require("got");

const SubReddits = [
  "terriblefacebookmemes",
  "pewdiepiesubmissions",
  "murderedbywords",
  "ComedyCemetery",
  "adviceanimals",
  "PrequelMemes",
  "memeeconomy",
  "teenagers",
  "dankmemes",
  "memes",
  "funny",
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
    got(`https://www.reddit.com/r/${Subreddit}/random/.json`).then(async(ResponseData) => {
      const [ list ] = JSON.parse(ResponseData.body);
      const [ post ] = list.data.children;
      
    if ((post.data.ups) < 1000){
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
    })
    }
  }
  
  const RandomSubreddit = SubReddits[Math.floor(Math.random() * SubReddits.length)]
  const RedditPost = await Get(RandomSubreddit)
  RedditPost.react("👍")
  RedditPost.react("👎")
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
