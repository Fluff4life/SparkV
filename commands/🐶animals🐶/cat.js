const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, message) => {
  request("http://aws.random.cat/meow")
    .then(res => res.json())
    .then(async json => {
      const MemeMessage = await message.channel.send({
        embed: {
          title: "Meow!",
          description: "Aweeeeee :D",
          color: "#0099ff",
          url: json.file,
          
          image: { 
            url: json.file
          },
          
          footer: {
            text: `Powered by http://aws.random.cat/meow`,
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
  aliases: ["cutecat"]
},
  
exports.help = {
  name: "Cat",
  description: "I will send a cute cat! Cute, but dogs are cuter.",
  usage: "",
  category: "🐶animals🐶",
  cooldown: 2
}