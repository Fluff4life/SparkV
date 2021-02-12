const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, message) => {
  request("https://randomfox.ca/floof/")
    .then(res => res.json())
    .then(async json => {
      const MemeMessage = await message.channel.send({
        embed: {
          title: "What does the fox say!?",
          description: "Awee :D",
          color: "#0099ff",
          url: json.image,
          
          image: { 
            url: json.image
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
  aliases: ["cutefox"],
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
},
  
exports.help = {
  name: "Fox",
  description: "I will send a cute fox! Ducks are better.",
  usage: "",
  category: "🐶animals🐶",
  cooldown: 2
}