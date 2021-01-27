const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, msg, Arguments) => {
  request(`https://roblox-embed-discord-jpcnmriva99q.runkit.sh/${Arguments}.json`)
    .then(res => res.json())
    .then(async json => {
    
      await msg.channel.send({
        embed: {
          title: json.title,
          description: json.description,
          color: json.color,
          url: json.url,
          
          image: { 
            url: json.image.url
          },
          
          thumbnail: {
            url: json.thumbnail.url
          },
          
          author: {
            name: json.author.name,
            url: json.author.url,
            icon_url: json.author.icon_url
          },
          
          fields: json.fields,
          
          footer: {
            text: json.footer.text,
            icon_url: json.footer.icon_url
          },
        }
      });
    });
},

exports.config = {
  enabled: true,
  guild_only: false,
  aliases: ["gd"],
  mod_only: false
},
  
exports.help = {
  name: "GameDetails",
  description: "I'll grab the details of any game for you :D",
  usage: "<Game ID>",
  cooldown: 10,
  category: "🔴Roblox🔴"
}