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
            image: Bot.user.AvatarURL()
          },
        }
      });

      MemeMessage.react("😍");
    });
},


exports.config = {
  name: "Duck",
  description: "Quack :D",
  aliases: ["ducc", "cuteduck"],
  usage: "",
  category: "🐶animals🐶",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 3
}