const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (bot, message) => {
    request("https://dog.ceo/api/breeds/image/random")
        .then(res => res.json())
        .then(async json => {
            if (!json.status === "success") {
                return await message.reply({
                    embed: {
                        title: `Uh Oh ${message.author.username}!`,
                        description: `Looks like the website returned an error! Please try again later.`,
                        color: "#0099ff",

            footer: {
              text: "Maybe up vote our bot while you wait?",
              icon_url: bot.user.displayAvatarURL(),
            },
          },
        });
      }

            const MemeMessage = await message.reply({
                embed: {
                    title: "Bark Bark!",
                    description: "Aweeeeee :D",
                    color: "#0099ff",
                    url: json.message,

                    image: {
                        url: json.message,
                    },

          footer: {
            text: `Powered by https://dog.ceo/dog-api/documentation/`,
            image: bot.user.displayAvatarURL(),
          },
        },
      });

            MemeMessage.react("😍");
        });
};
exports.config = {
  name: "Dog",
  description: "I will send a cute dog! Aweeeee :D",
  aliases: ["cutedog"],
  usage: "",
  category: "🐶Animals🐶",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 3,
};
