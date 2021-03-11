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
            image: Bot.user.AvatarURL
          },
        }
      });

      MemeMessage.react("😍");
    });
},

exports.config = {
  name: "Fox",
  description: "I will send a cute fox! Ducks are better.",
  aliases: ["cutefox"],
  usage: "",
  category: "🐶animals🐶",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 3
}