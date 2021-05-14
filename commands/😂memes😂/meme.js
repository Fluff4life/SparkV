const Discord = require("discord.js");
const request = require("node-fetch");

const SubReddits = [
  "PewdiepieSubmissions",
  "ComedyCemetery",
  "AdviceAnimals",
  "PrequelMemes",
  "MemeEconomy",
  "DankMemes",
  "me_irl",
  "Memes",
  "Funny",
]

exports.run = async (Bot, message) => {
  const Subreddit = SubReddits[Math.floor(Math.random() * SubReddits.length)]

  request(`https://www.reddit.com/r/${Subreddit}/top/.json`)
    .then(res => res.json())
    .then(async json => {
      const post = json.data.children[Math.floor(Math.random() * json.data.children.length)].data

      if (post.title.length > 256) {
        const DankMemeEmbed = new Discord.MessageEmbed()
          .setTitle("Title too long")
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(`👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} | ⚙r/${Subreddit} • ${Bot.Config.Embed.EmbedFooter}`, Bot.user.displayAvatarURL())
          .setColor(Bot.Config.Embed.EmbedColor);

        message.lineReplyNoMention(DankMemeEmbed)
      } else {
        const DankMemeEmbed = new Discord.MessageEmbed()
          .setTitle(post.title)
          .setImage(post.url)
          .setURL(`https://www.reddit.com${post.permalink}`)
          .setFooter(`👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} | ⚙r/${Subreddit} • ${Bot.Config.Embed.EmbedFooter}`, Bot.user.displayAvatarURL())
          .setColor(Bot.Config.Embed.EmbedColor);

        message.lineReplyNoMention(DankMemeEmbed)
      }
    })

  /* 
  async function Get(Subreddit) {
    request(`https://ch1ll.herokuapp.com/api/meme?subreddit=${Subreddit}`)
      .then(json => json.json())
      .then(json => {
        if (!json.code){
          return message.lineReply("Unknown error occured. Please try again!")
        } else if (json.code === 400){
          return message.lineReply("Failed to get meme. Please try again!")
        }

          return message.lineReply({
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
                icon_url: Bot.user.displayAvatarURL()
              },
            }
          })
      })
  }

const RandomSubreddit = SubReddits[Math.floor(Math.random() * SubReddits.length)]

message.channel.startTyping()

await Get(RandomSubreddit)

message.channel.stopTyping()

*/
},


exports.config = {
  name: "Meme",
  description: "LOL",
  aliases: ["memey"],
  usage: "",
  category: "😂memes😂",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"],
  member_permissions: [],
  enabled: true,
  cooldown: 3
}