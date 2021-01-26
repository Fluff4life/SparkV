const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, msg, Arguments) => {
  request(
    `https://roblox-embed-discord-jpcnmriva99q.runkit.sh/${Arguments}.json`
  )
    .then(res => res.json())
    .then(async json => {
      const GameEmbend = new Discord.MessageEmbed()
        .setTitle(json.title)
        .setDescription(json.description)
        .setImage(json.image.url)
        .setThumbnail(json.thumbnail.url)
        .setURL(json.url)
        .setColor(json.color)
        .addFields(json.fields)
        .setFooter(json.footer.text, json.footer.icon_url)
        .setAuthor(json.author.name, json.author.icon_url, json.author.url);

      await msg.reply(GameEmbend);
    });
};

(exports.config = {
  enabled: true,
  guild_only: false,
  aliases: ["gd"],
  mod_only: false
}),
  (exports.help = {
    name: "GameDetails",
    description:
      "I'll grab the details of any game for you :D",
    usage: "<Game ID>",
    cooldown: 10,
    category: "🔴Roblox🔴"
  });
