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

          footer: {
            text: `Powered by http://aws.random.cat/meow`,
            image: bot.user.displayAvatarURL() },
        },
      });

      MemeMessage.react("😍");
    });
};
  exports.config = {
    name: "Cat",
    description: "I will send a cute cat! Cute, but dogs are cuter.",
    aliases: ["cutecat"],
    usage: "",
    category: "🐶Animals🐶",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 3
};
