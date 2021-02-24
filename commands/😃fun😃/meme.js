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

  async function Get(Subreddit) {
    request(`https://ch1ll.herokuapp.com/api/meme?subreddit=${Subreddit}`)
      .then(json => json.json())
      .then(json => {
        if (!json.code){
          return message.channel.send("Unknown error occured. Please try again!")
        } else if (json.code === 400){
          return message.channel.send("Failed to get meme. Please try again!")
        }

          return message.channel.send({
            embed: {
              title: json.response.data.title,
              description: json.response.data.description,
              color: "#0099ff",

              url: `https://reddit.com${json.response.data.permalink}`,

              image: {
                url: json.response.data.url,
              },

              footer: {
                text: `👍${json.response.data.data.ups} | 💬${json.response.data.num_comments} | 😃u/${json.response.data.author} | r/${Subreddit}`,
                icon_url: process.env.bot_logo
              },
            }
          })
      })
  }

const RandomSubreddit = SubReddits[Math.floor(Math.random() * SubReddits.length)]

message.channel.startTyping()

await Get(RandomSubreddit)

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
    category: "😃fun😃",
    cooldown: 2
}
