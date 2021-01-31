const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, message) => {
  request("https://random-d.uk/api/random?format=json")
    .then(res => res.json())
    .then(async json => {
      const MemeMessage = await message.channel.send({
        embed: {
          title: "Quack!",
          description: "Aweeeeee :D",
          color: "#0099ff",
          url: json.url,
          
          image: { 
            url: json.url
          },
          
          footer: {
            text: json.message,
            image: process.env.bot_logo
          },
        }
      });

      MemeMessage.react("😍");
    });
},

exports.config = {
  enabled: true,
  guild_only: true,
  mod_only: false,
  aliases: ["cuteduck"]
},
  
exports.help = {
  name: "Duck",
  description: "I will send a cute duck! Quack! :D",
  usage: "",
  category: "🐶animals🐶",
  cooldown: 2
}