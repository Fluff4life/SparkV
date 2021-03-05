const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, msg, Arguments) => {
if (!Arguments){
  return msg.channel.send("What's the ID??").then(m => m.delete({ timeout: 5000 }))
}

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
  name: "GameDetails",
  description: "I'll grab the details of any game for you.",
  aliases: ["gd"],
  usage: "<Game ID>",
  category: "⚫roblox⚫",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 10
}