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

<<<<<<< HEAD
            footer: {
              text: "Maybe up vote our bot while you wait?",
              icon_url: bot.user.displayAvatarURL(),
            },
          },
        });
      }
=======
                        footer: {
                            text: "Maybe up vote our bot while you wait?",
                            icon_url: bot.user.displayAvatarURL(),
                        },
                    },
                });
            }
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

            const MemeMessage = await message.reply({
                embed: {
                    title: "Bark Bark!",
                    description: "Aweeeeee :D",
                    color: "#0099ff",
                    url: json.message,

                    image: {
                        url: json.message,
                    },

<<<<<<< HEAD
          footer: {
            text: `Powered by https://dog.ceo/dog-api/documentation/`,
            image: bot.user.displayAvatarURL(),
          },
        },
      });
=======
                    footer: {
                        text: `Powered by https://dog.ceo/dog-api/documentation/`,
                        image: bot.user.displayAvatarURL(),
                    },
                },
            });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

            MemeMessage.react("😍");
        });
};
exports.config = {
<<<<<<< HEAD
  name: "Dog",
  description: "I will send a cute dog! Aweeeee :D",
  aliases: ["cutedog"],
  usage: "",
  category: "🐶Animals🐶",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 3,
=======
    name: "Dog",
    description: "I will send a cute dog! Aweeeee :D",
    aliases: ["cutedog"],
    usage: "",
    category: "🐶Animals🐶",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 3,
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
};
