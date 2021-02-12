const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, message) => {
  request("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(res => res.json())
    .then(json => {
      const FunFactEmbed = new Discord.MessageEmbed()
        .setTitle("Did you know?")
        .setDescription(json.text)
        .setFooter(`Fun facts powered by https://uselessfacts.jsph.pl!`)
        .setColor("#0099ff")
        .setTimestamp();

      const Message = message.reply(FunFactEmbed);

  Message.react("🤯");
  Message.react("😬");
    });
},
  
exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["uf"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"]
  },
  
  exports.help = {
    name: "UselessFact",
    description: "I will get a useless fact! You're better off with the advice command...",
    usage: "",
    category: "😃fun😃",
    cooldown: 2
  }