const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, message) => {
  request("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(res => res.json())
    .then(json => {
      const FunFactEmbed = new Discord.MessageEmbed()
        .setTitle("Did you know?")
        .setDescription(json.text)
        .setFooter(`Fun facts powered by https://uselessfacts.jsph.pl! • ${Bot.Config.Embed.EmbedFooter}`)
        .setColor(Bot.Config.Embed.EmbedColor)
        .setTimestamp();

      const Message = message.lineReply(FunFactEmbed);

      Message.react("🤯");
      Message.react("😬");
    });
},

exports.config = {
  name: "UselessFact",
  description: "I will get a useless fact! You're better off with the advice command...",
  aliases: ["uf"],
  usage: "",
  category: "😃fun😃",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"],
  member_permissions: [],
  enabled: true,
  cooldown: 3
}