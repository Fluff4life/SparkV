const Discord = require("discord.js");
const request = require("node-fetch");

const cmd = require("../../templates/command");

async function execute(bot, message) {
  request("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(res => res.json())
    .then(json => {
      const FunFactEmbed = new Discord.MessageEmbed()
        .setTitle(`${bot.config.Emojis.success} | Did you know?`)
        .setDescription(json.text)
        .setFooter(`Fun facts powered by https://uselessfacts.jsph.pl! • ${bot.config.embed.footer}`)
        .setColor(bot.config.embed.color)
        .setTimestamp();

      const Message = message.reply({
        embeds: [FunFactEmbed]
      });

      Message.react("🤯");
      Message.react("😬");
    });
}

module.exports = new cmd(execute, {
  description: "I will get a useless fact! You're better off with the advice command...",
  aliases: ["uf"],
  dirname: __dirname,
  usage: `<word>`,
});
