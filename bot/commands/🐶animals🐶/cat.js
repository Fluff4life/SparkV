const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (bot, message) => {
    request("http://aws.random.cat/meow")
        .then(res => res.json())
        .then(async json => {
            const MemeMessage = await message.reply({
                embed: {
                    title: "Meow!",
                    description: "Aweeeeee :D",
                    color: "#0099ff",
                    url: json.file,

                    image: {
                        url: json.file,
                    },

<<<<<<< HEAD
          footer: {
            text: `Powered by http://aws.random.cat/meow`,
            image: bot.user.displayAvatarURL(),
          },
        },
      });
=======
                    footer: {
                        text: `Powered by http://aws.random.cat/meow`,
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
  name: "Cat",
  description: "I will send a cute cat! Cute, but dogs are cuter.",
  aliases: ["cutecat"],
  usage: "",
  category: "🐶Animals🐶",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 3,
=======
    name: "Cat",
    description: "I will send a cute cat! Cute, but dogs are cuter.",
    aliases: ["cutecat"],
    usage: "",
    category: "🐶Animals🐶",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 3,
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
};
