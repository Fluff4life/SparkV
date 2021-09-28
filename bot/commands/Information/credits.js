const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

const Credits = [
  {
    name: "**🛠 | Developers**",
    value: "The people who made SparkV!\n**KingCh1ll** - Head Developer\n**Qu1ckly_Frost** - Developer",
    inline: true,
  },
  {
    name: "**✨ | Contributors**",
    value: "People that have contributed to SparkV.\n**2Lost4Discord** - Getting the bot verified.",
    inline: true,
  },
];

module.exports = new cmd(
  (bot, message) => {
    const NewEmbed = new Discord.MessageEmbed()
      .setTitle("Credits")
      .setDescription(`Here's the list of people who've helped SparkV on his path to success!`)
      .setColor(bot.config.embed.color)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "gif" }))
      .addFields(Credits);

    return message.reply({
      embeds: [NewEmbed]
    });
  },
  {
    description: `Look at everyone who helped make SparkV!`,
    dirname: __dirname,
    usage: "",
    aliases: ["deleteg"],
    perms: ["EMBED_LINKS"],
  },
);
