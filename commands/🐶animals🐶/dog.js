const Discord = require("discord.js");
const request = require("node-fetch");

(exports.run = async (Bot, message) => {
  request("https://dog.ceo/api/breeds/image/random")
    .then(res => res.json())
    .then(async json => {
      if (!json.status === "success") {
        const ErrorEmbend = new Discord.MessageEmbed()
          .setTitle("Error!")
          .setDescription("The website had an error. No pics for you D:")
          .setColor("#0099ff");

        return await message.reply(ErrorEmbend);
      }

      const RedditEmbend = new Discord.MessageEmbed()
        .setTitle("Bark Bark!")
        .setImage(json.message)
        .setURL(json.message)
        .setFooter(
          `Powered by https://dog.ceo/dog-api/documentation/`,
          process.env.bot_logo
        )
        .setColor("#0099ff");

      const MemeMessage = await message.reply(RedditEmbend);

    MemeMessage.react("😍");
      }
    );
}),
  (exports.config = {
    enabled: true,
    guild_only: true,
    mod_only: false,
    aliases: ["cutedog"]
  }),
  (exports.help = {
    name: "Dog",
    description: "I will send a cute dog! Aweeeee :D",
    usage: "",
    category: "🐶animals🐶",
    cooldown: 2
  });
