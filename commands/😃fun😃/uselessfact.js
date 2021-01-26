const Discord = require("discord.js");
const request = require("node-fetch");

async function DMReaction(message, Embed) {
  const Message = await message.reply(Embed);

  Message.react("🤯");
  Message.react("😬");
}

async function ChannelReaction(message, Embed) {
  const Message = await message.channel.send(Embed);

  Message.react("🤯");
  Message.react("😬");
}

(exports.run = async (Bot, message) => {
  request("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(res => res.json())
    .then(json => {
      const FunFactEmbed = new Discord.MessageEmbed()
        .setTitle("Did you know?")
        .setDescription(json.text)
        .setFooter(`Fun facts powered by https://uselessfacts.jsph.pl!`)
        .setColor("#0099ff")
        .setTimestamp();

      if (message.channel.type === "dm") {
        DMReaction(message, FunFactEmbed);

        return;
      }

      ChannelReaction(message, FunFactEmbed);
    });
}),
  (exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["uf"],
    mod_only: false
  }),
  (exports.help = {
    name: "UselessFact",
    description:
      "I will get a useless fact! You're better off with the advice command...",
    usage: "",
    category: "😃fun😃",
    cooldown: 2
  });
